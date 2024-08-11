## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Feature
- Authentication using jwt:
- User cannot access '/dashboard/*' when not logged in
- User cannot access '/' when not logged out
- CRUD action using axios with API (https://jsonplaceholder.typicode.com/)
- Docker Container

## Route List:
- '/': Login
- '/dashboard/post': List posts and comments
- '/dashboard/post/[id]/create': Create new comment

## Account:
- username: ananta, password: PSN_CHALLENGE
- username: psn, password: psn1234

## NOTE:
- base on API proider, when performing CRUD action, resource will not be really updated on the server but it will be faked as if but don't worry we can still monitor the existing traffic
- Create Comment
  
  ![image](https://github.com/user-attachments/assets/268a3b85-df24-4496-8ca8-bb4af9b36a13)
  
  ![image](https://github.com/user-attachments/assets/35703412-a87c-47f6-bb79-a83b6b374843)
- Delete Post
  
  ![image](https://github.com/user-attachments/assets/5c16745b-cff1-4e20-9550-7631e4f1145c)


