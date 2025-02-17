# Ryt Bank Front End Assessment

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Description

- This is a expo react native application.
- This applicaiton contains 3 screen which consist Auth, History and Detail.
- A list of dummy data of transactions is stored in transactions.json that can be found in app/types

## Workflows

1. Login by Pressing the Login button to authenticate with biometrics if the device is supported
2. View List of Transactions History
3. If the screen is pulled in the History Screen, it will refresh the list by simulating a api call by appending 2 fixed transactions data to the top of the list.
4. Click the reveal icon to reveal the ammount & verified with biometrics. (Click on the eye slash icon to unreveal)
5. Click on the specific transaction card to view more details about the transactions.

## Future Improvements

1. Implement a better authentication workflow by utilizing local storage & session instead of navigate to another screen if a success auth 
2. Simple filter for Hisotry Screen to filter card type etc
3. More transactions data properties
4. Some Simple animations throughout the module would improve the overall user experience 
5. Use a cleaner and better font