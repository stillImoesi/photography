# Still Peter studio
## Business model

### Backend logic
- AWS lambda functions
- S3 for asset storage
- DynamoDB for database
- Cognito for user authentication (User pool)

### Picture upload
    - Pictures will be uploaded to S3
        - Folder will be created in S3
        - User Email name will be saved to Database Album table
            - Lambda function is triggered when root folder is created
            - Lambda function creates a new row in the Album DB 

        - Pictures will be uploaded to folder in S3 (Local env)
            - New additional folder normal(x0.5), high (x1), extra(x4) will be created
            - normal, high and extra resolutionS pictures will be uploaded

### Database
    - All picture upload is a new entry to database
    - Tables
        - Album
            - ID
            - Album name
            - MaxAllowPictures,
            - SelectedPictures - Array of strings
            - Email
        - Payments
            - Payment ID
            - Receipt ID
            - Picture ID
            - Ablum ID
            - Price
            - Res

### After payment

### Pictures will be previewed will additional links to buy Mid, Hi res
    - Upon successful payment, page reloads and Album is returned with following database
    - {
        Album ID
        url expiration
        Pictures [{
            S3 url
            isPaid
            resolution
        }]
    }
    - User needs access to read folder. What about AWS cognito and cognitor identity pool with AWS STS?

