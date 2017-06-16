# React Server

This app contains all of the endpoints needed for the entire React Curriculum.

For example:

- https://github.com/gSchool/react-crm

## NOTE

This server stores everything in-memory, so every time you restart the server, you get a clean slate.

## Install

```
yarn
yarn start
```

Then you can see the API running on http://localhost:8181

## API Endpoints

This API uses Hypermedia.  So once you make the first request to the index path, you can get all the URLs from that point on.

### `GET /api`

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/"
    },
    "messages": {
      "href": "http://localhost:8181/api/messages"
    },
    "people": {
      "href": "http://localhost:8181/api/people"
    }
  }
}
```

### Messages

Messages either have a sender, or a receiver.

If it has a `sender`, it means you _received_ the message.

If it has a `receiver`, it means you _sent_ the message.

### `GET /api/messages`

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/messages"
    }
  },
  "_embedded": {
    "messages": [
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/messages/1"
          }
        },
        "id": 1,
        "subject": "Hi",
        "starred": true,
        "read": true,
        "labels": [
          "dev",
          "personal"
        ],
        "sender": {
          "id": 1,
          "ref": "http://localhost:8181/api/people/1"
        }
      },
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/messages/2"
          }
        },
        "id": 2,
        "subject": "Hi again",
        "starred": false,
        "read": false,
        "labels": [],
        "sender": {
          "id": 2,
          "ref": "http://localhost:8181/api/people/2"
        }
      }
    ],
    "people": [
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/1"
          },
          "meetings": {
            "href": "http://localhost:8181/api/people/1/meetings"
          }
        },
        "id": 1,
        "name": "Frida Kuvalis"
      },
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/2"
          },
          "meetings": {
            "href": "http://localhost:8181/api/people/2/meetings"
          }
        },
        "id": 2,
        "name": "Demarcus Mayer"
      }
    ]
  }
}
```

### `GET /api/messages/:id`

Response (notice that there is a `content` field in this response that is not present in the `/api/messages` endpoint):

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/messages/1"
    }
  },
  "id": 1,
  "subject": "Hi",
  "starred": true,
  "read": true,
  "labels": [
    "dev",
    "personal"
  ],
  "sender": {
    "id": 1,
    "ref": "http://localhost:8181/api/people/1"
  },
  "content": "Hello there"
}
```

### `POST /api/messages`

Request:

```json
{
  "recipient_id": 1,
  "subject": "I created this",
  "content": "And it is sent"
}
```

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/messages/1"
    }
  },
  "id": 1,
  "subject": "I created this",
  "starred": false,
  "read": false,
  "labels": [],
  "recipient": {
    "id": 1,
    "ref": "http://localhost:8181/api/people/1"
  },
  "content": "And it is sent"
}
```

### `PATCH /api/messages`

The request body can be any of these:

```json
{
  "messageIds": [ 1, 3 ],
  "command": "star",
  "star": false
}
```

`star` can be true or false.

```json
{
  "messageIds": [ 1, 3 ],
  "command": "read",
  "read": true
}
```

`read` can be true or false.

```json
{
  "messageIds": [ 1, 3 ],
  "command": "delete"
}
```

```json
{
  "messageIds": [ 1, 3 ],
  "command": "addLabel",
  "label": "dev"
}
```

```json
{
  "messageIds": [ 1, 3 ],
  "command": "removeLabel",
  "label": "dev"
}
```

Response: An HTTP 200 Response

### People

### `GET /api/people`

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/people"
    }
  },
  "_embedded": {
    "people": [
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/1"
          },
          "meetings": {
            "href": "http://localhost:8181/api/people/1/meetings"
          }
        },
        "id": 1,
        "name": "Frida Kuvalis"
      },
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/2"
          },
          "meetings": {
            "href": "http://localhost:8181/api/people/2/meetings"
          }
        },
        "id": 2,
        "name": "Demarcus Mayer"
      }
    ]
  }
}
```

### `GET /api/people/:id`

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/people/1"
    },
    "meetings": {
      "href": "http://localhost:8181/api/people/1/meetings"
    }
  },
  "id": 1,
  "name": "Frida Kuvalis"
}
```

### Meetings

### `GET /api/people/:personId/meetings`

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/people/1/meetings"
    }
  },
  "_embedded": {
    "meetings": [
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/1/meetings/1"
          }
        },
        "people": [
          {
            "id": 1,
            "ref": "http://localhost:8181/api/people/1"
          },
          {
            "id": 2,
            "ref": "http://localhost:8181/api/people/2"
          }
        ],
        "id": 1,
        "comment": "comment 1"
      },
      {
        "_links": {
          "self": {
            "href": "http://localhost:8181/api/people/1/meetings/2"
          }
        },
        "people": [
          {
            "id": 3,
            "ref": "http://localhost:8181/api/people/3"
          },
          {
            "id": 1,
            "ref": "http://localhost:8181/api/people/1"
          }
        ],
        "id": 2,
        "comment": "comment 2"
      }
    ]
  }
}
```

### `POST /api/people/:personId/meetings`

Request:

```json
{
  "otherPersonId": 2,
  "comment": "Some comment"
}
```

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/people/1/meetings/1"
    }
  },
  "people": [
    {
      "id": 1,
      "ref": "http://localhost:8181/api/people/1"
    },
    {
      "id": 2,
      "ref": "http://localhost:8181/api/people/2"
    }
  ],
  "id": 1,
  "comment": "Some comment"
}
```

### `GET /api/people/:personId/meetings/:id`

Response:

```json
{
  "_links": {
    "self": {
      "href": "http://localhost:8181/api/people/1/meetings/1"
    }
  },
  "people": [
    {
      "id": 1,
      "ref": "http://localhost:8181/api/people/1"
    },
    {
      "id": 2,
      "ref": "http://localhost:8181/api/people/2"
    }
  ],
  "id": 1,
  "comment": "Some comment"
}
```
