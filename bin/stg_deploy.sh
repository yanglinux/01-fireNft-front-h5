#!/bin/bash

yarn

BASE_URL=https://stg-api.fire-digital.link.:3000 BSC_EXPLORER_URL=https://testnet.bscscan.com/address/ yarn generate

aws --profile fire s3 sync ./dist s3://m.stg.fire-digital.link

aws --profile fire cloudfront create-invalidation --distribution-id E35P33GPC8A028 --paths '/*'
