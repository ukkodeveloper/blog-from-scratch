---
title: Making Multiple API Calls for Infinite Scroll
date: 2024-06-18
tags:
  - tanstackQuery
  - infinite-scroll
  - react
image: /images/무한스크롤에서%20다수%20API%20호출하기-20241003130950541.webp
summary: Implement infinite scroll with multiple API endpoints
published: true
---

The challenge I was presented with was to implement infinite scrolling with a list of images. Images were required to be fetched from multiple APIs, 20 at a time, and the title of the last image should be passed for the next request.

Initially, I attempted to use separate useInfiniteQuerys for each API. useInfiniteQuery is a hook provided by the React Query library that simplifies implementing data fetching scenarios like pagination or infinite scrolling. However, this approach introduced unexpected difficulties.

## Problems with the Initial Approach

1. **Out-of-order Response**: APIs called concurrently didn't always respond in the same order, which led to the images being in a scrambled sequence. This was due to JavaScript's asynchronous nature and the fact that even when using Promise.all, each request could complete at a different time.

2. **Complex State Management**: Managing the state of each API individually resulted in code complexity. It went against React's philosophy of Single Source of Truth (SSOT), where an application's state is managed in one place to ensure consistency and reduce potential bugs.

## The Solution

To tackle these issues, I opted for a method where all API calls were handled within a single function and their combined state was managed together.

1. **Ensuring Response Order**: Handling all the requests and their results at once eliminated the possibility of out-of-order responses. I used Promise.all to handle multiple requests in parallel but reordered the results to match the original endpoint sequence.

2. **Efficient State Management**: Managing the states of all APIs cohesively helped reduce unnecessary requests. This, combined with React Query's caching mechanism, allowed for more efficient data handling.

### Implementation Code

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
          .then((res) => res.json())
          .then((data) => ({ data, url }))
      )
  );

  return endpointStates.map((endpoint) => {
    const result = results.find((res) => res.url === endpoint.url);
    return result && result.data.length > 0
      ? {
          ...endpoint,
          lastImage: result.data[result.data.length - 1].title,
          hasMore: true,
        }
      : { ...endpoint, hasMore: false };
  });
}

function useMultiEndpointInfiniteQuery(initialEndpoints: Endpoint[]) {
  const [endpoints, setEndpoints] = useState(
    initialEndpoints.map((endpoint) => ({
      ...endpoint,
      lastImage: '',
      hasMore: true,
    }))
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

A notable aspect of the implementation is the use of React Query's useInfiniteQuery hook. This hook internally manages pagination state and relies on a getNextPageParam function to determine parameters for subsequent page requests. This is crucial for implementing infinite scrolling, as it allows for the effective tracking of the last states of each API.

## In Summary

The presented solution offers several advantages. Firstly, state management is simplified. By handling all API states in a single place, it eliminates state inconsistency issues and allows for efficient state updates while adhering to React's principle of immutability. Additionally, it's highly extensible. The list of APIs managed as an array makes it trivial to add or remove endpoints, resulting in increased code maintainability. There are also performance benefits. By minimizing unnecessary requests, network traffic and performance are optimized, and when combined with React Query's caching strategy, already fetched data is not requested again but rather retrieved from the cache, improving efficiency.

In conclusion, for scenarios where multiple APIs need to be called concurrently and their states managed, the proposed approach stands out as a suitable choice. It effectively combines the advantages of parallel processing while ensuring consistent state management.
