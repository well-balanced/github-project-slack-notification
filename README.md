# github-projects-slack-notification

<img width="769" alt="스크린샷 2022-02-15 오후 10 31 54" src="https://user-images.githubusercontent.com/48206623/154096067-3bdb7f31-5d5b-417c-b7ff-56cf2b1dbd57.png">

## Prerequisite
- [GitHub Organization의 어드민 권한을 가진 Personal token 발행](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Organization Webhook 생성](https://docs.github.com/en/rest/reference/orgs#create-an-organization-webhook)
- [AWS Access Key Id, Secret Access Key 발급](https://docs.aws.amazon.com/ko_kr/IAM/latest/UserGuide/id_credentials_access-keys.html)
- [Notion API Key 발급](https://developers.notion.com/docs/getting-started)

## Setup
```sh
$ npm i -g serverless && yarn
$ touch .env # refer to .example.env
```

## Deploy
```sh
# development
$ npm run deploy:dev

# production
$ npm run deploy:prod
```
