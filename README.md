# flash_sale
NestJS Web Application

## How to Run
1. Rename example.env to .env and fill out variables with your own values.
2. Have a MySQL DB Instance Running, Ideally running on a Docker Container. For more info https://phoenixnap.com/kb/mysql-docker-container
3. Rename example.ormconfig.json to ormconfig.json and fill in the necessary DB Connection details with what you created in Step 2.
4. Ensure MySQL DB Instance is running then run `npm run typeorm migration:run`
5. Run `npm install`
6. Run `npm run start:dev`
