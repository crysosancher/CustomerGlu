

## Telegram Bot Assignment

### Design Document

**System Design:**
- The bot will use the Telegram Bot API to communicate with users.
- It will periodically collect server health stats (CPU, RAM) and notify users every 6 hours.
- Users can also request stats on demand using a command.
- The bot will monitor VM responsiveness and notify multiple users if a VM is unresponsive for more than 5 seconds.
- Users can request a list of running processes.
- API calls will be authenticated using secure stateless tokens.

**Development Plan:**
1. Set up a Node.js project.
2. Integrate the Telegram Bot API using libraries like `node-telegram-bot-api`.
3. Implement functions to gather server health stats, check VM responsiveness, and retrieve running processes.
4. Implement token-based authentication for APIs.
5. Write unit tests for all functions.
6. Implement optional bonus features if time permits.

**Hardware and Software Requirements:**
- Server to run the Node.js application.
- Node.js runtime installed.
- Access to the Telegram Bot API.

### Code Repository
Set up a Git repository to manage your project code.

### Working Deployment
Deploy your Node.js application to a server where it can run continuously.

### Implementation Steps

1. **Set Up Your Bot:**
   - Create a bot on Telegram using the BotFather.
   - Note down the bot token for API communication.

2. **Install Dependencies:**
   - Initialize a Node.js project.
   - Install the `node-telegram-bot-api` library for interacting with Telegram.
   - Install any other required libraries.

3. **Implement Core Functionality:**
   - Set up a periodic job (e.g., using `setInterval`) to gather server health stats every 6 hours and notify users.
   - Implement a command handler to respond with current server stats.
   - Implement a VM responsiveness monitor using `ping` or similar techniques.
   - Notify users if a VM is unresponsive.

4. **Authentication:**
   - Implement token-based authentication for your APIs. Generate and verify tokens for each user.

5. **Running Processes:**
   - Implement a command to retrieve a list of running processes using child processes or system commands.

6. **Unit Tests:**
   - Write unit tests for all your functions using a testing library like `Mocha` and `Chai`.

7. **Bonus Features (Optional):**
   - If you choose to implement the bonus features, integrate the necessary APIs for executing commands on the server and sending notifications via call or SMS.

8. **Deployment:**
   - Deploy your application to a server where it can run continuously.
   - Ensure the periodic tasks continue to work after deployment.

Remember that this is a high-level overview, and you'll need to dive into the specifics of each step and adapt the implementation based on your preferences and the libraries you choose.

---

