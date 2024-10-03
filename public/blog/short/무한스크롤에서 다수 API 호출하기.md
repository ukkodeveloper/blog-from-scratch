---
title: 무한스크롤에서 다수 API 호출하기
date: 2024-06-18
tags:
  - tanstackQuery
  - 무한스크롤
  - react
image: /images/무한스크롤에서%20다수%20API%20호출하기-20241003130950541.webp
summary: 여러 endpoint로 api호출을 하는 상황에서 무한스크롤 구현하기
published: true
---

내가 맞닥뜨린 과제는 무한 스크롤로 이미지 목록을 불러오는 것이었다. 여러 API에서 각각 20개씩 이미지를 가져와야 했고, 다음 요청 때는 마지막 이미지 제목을 전달해야 했다. 

처음에는 각 API마다 별도의 useInfiniteQuery를 사용하려 했다. useInfiniteQuery는 React Query 라이브러리에서 제공하는 훅으로, 페이지네이션이나 무한 스크롤과 같은 데이터 로딩 시나리오를 쉽게 구현할 수 있게 해준다. 그러나 이 방식은 예상치 못한 문제를 일으켰다.

## 초기 접근 방식의 문제점

1. **응답 순서 뒤섞임**: 동시 호출된 API의 응답이 순서대로 오지 않아 이미지 순서가 뒤섞이는 문제가 발생했다. 이는 JavaScript의 비동기 특성 때문인데, Promise.all을 사용하더라도 각 요청의 완료 시점이 다르기 때문이다.

2. **복잡한 상태 관리**: 각 API의 상태를 개별적으로 관리하다 보니 코드가 복잡해졌다. 이는 React의 상태 관리 철학인 '단일 진실 공급원(Single Source of Truth)' 원칙에 위배되는 결과를 낳았다. 단일 진실 공급원 원칙은 애플리케이션의 상태를 한 곳에서 관리하여 일관성을 유지하고 버그 발생 가능성을 줄이는 개념이다.

## 해결 방안

이 문제를 해결하기 위해 모든 API 요청을 하나의 함수에서 처리하고, 각 요청의 상태를 통합 관리하는 방식을 택했다. 


1. **응답 순서 보장**: 모든 요청과 결과를 한 번에 관리함으로써 응답 순서 뒤섞임을 방지할 수 있다. Promise.all을 사용해 여러 요청을 병렬로 처리하되, 결과를 원래 엔드포인트 순서에 맞게 재정렬하는 방식이다.

2. **효율적인 상태 관리**: 모든 API의 상태를 통합 관리함으로써 불필요한 요청을 줄일 수 있다. 이는 React Query의 캐싱 메커니즘과 결합하여 더욱 효과적인 데이터 관리를 가능케 한다.

### 구현 코드

```typescript
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Endpoint {
  url: string;
}

interface EndpointState extends Endpoint {
  lastImage: string;
  hasMore: boolean;
}

async function fetchImages(endpointStates: EndpointState[]) {
  const results = await Promise.all(
    endpointStates
      .filter(({ hasMore }) => hasMore)
      .map(({ url, lastImage }) =>
        fetch(`${url}?lastImage=${lastImage}`)
          .then(res => res.json())
          .then(data => ({ data, url }))
      )
  );

  return endpointStates.map(endpoint => {
    const result = results.find(res => res.url === endpoint.url);
    return result && result.data.length > 0
      ? { ...endpoint, lastImage: result.data[result.data.length - 1].title, hasMore: true }
      : { ...endpoint, hasMore: false };
  });
}

function useMultiEndpointInfiniteQuery(initialEndpoints: Endpoint[]) {
  const [endpoints, setEndpoints] = useState(
    initialEndpoints.map(endpoint => ({ ...endpoint, lastImage: '', hasMore: true }))
  );

  return useInfiniteQuery({
    queryKey: ['images'],
    queryFn: () => fetchImages(endpoints),
    getNextPageParam: (lastPage) => {
      const validEndpoints = lastPage.filter(({ hasMore }) => hasMore);
      setEndpoints(lastPage);
      return validEndpoints.length > 0 ? lastPage : undefined;
    },
  });
}
```

이 구현에서 주목할 점은 React Query의 useInfiniteQuery 훅을 사용한 방식이다. 이 훅은 내부적으로 페이지네이션 상태를 관리하며, getNextPageParam 함수를 통해 다음 페이지의 파라미터를 결정한다. 이는 무한 스크롤 구현에 필수적인 요소로, 각 API의 마지막 상태를 효과적으로 추적할 수 있게 해준다.

## 끝으로

제시한 해결 방안은 여러 측면에서 이점을 가진다. 우선 상태 관리가 단순화된다. 모든 API의 상태를 한 곳에서 관리함으로써 상태 불일치 문제를 해결할 수 있으며, 이는 React의 불변성 원칙을 지키면서도 효율적인 상태 업데이트를 가능케 한다. 또한 이 방식은 확장성이 뛰어나다. 배열로 관리되는 API 목록은 새로운 엔드포인트를 추가하거나 제거하는 것이 간단해, 코드의 유지보수성을 크게 향상시킨다. 성능 면에서도 이점이 있다. 불필요한 요청을 줄여 네트워크 트래픽과 성능을 최적화할 수 있으며, React Query의 캐싱 전략과 결합하여 이미 가져온 데이터는 재요청하지 않고 캐시에서 불러오는 방식으로 효율성을 높인다.

결과적으로, 여러 API를 동시에 호출하면서 상태를 관리해야 하는 상황에서는 제시한 방법이 가장 적합하다고 판단했다. 병렬 처리의 이점을 살리면서도 일관된 상태 관리를 가능케 한다는 점에서 가장 좋았다.

