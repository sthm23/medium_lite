## auth mutation

```
mutation login($input: LoginInput!) {
  login(loginInput: $input) {
    userId
    accessToken
    refreshToken
  }
}

mutation signup($input:CreateUserInput!) {
  signup(createUserInput:$input) {
	id
    name
    password
    role
  }
}

mutation RefreshToken($input: RefreshInput!) {
  refreshToken(refreshInput: $input) {
    refreshToken
		accessToken
  }
}
```

## user query and mutation

```
query Users {
	users(limit:2, offset:0) {
    id
    name
    email
    viewedPosts {
        post {
            id,
            content
        }
    }
  }
}

query User($id:Int!){
  user(id:$id) {
    name
    id
    role
    viewedPosts {
      post {
        title
      }
    }
  }
}

mutation createuser($input:CreateUserInput!) {
  createUser(createUserInput:$input) {
		id
        name
        password
        role
  }
}
```

## Post query and mutation

```
mutation createPost($input:CreatePostInput!) {
  createPost(createPostInput:$input) {
		# author{
		# name
		# },
    content,
    title
  }
}

query Posts {
  posts(limit:2, offset:0 startingId:1){   
    id
    content,
    author{
      name
      email
    }
    viewers{
      user{
        email
      }
    }
  }
  
}

query Post($id:Int!) {
  post(id:$id) {
    id
    content,
    author{
      name
      email
    }

  }
}
```
## http header 

```
{
  "Authorization": "Bearer <token>"
}
```