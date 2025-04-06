The backend is written in Spring Boot using mongodb. Here's how to run it.

Step 1. Create a database named 'ComicBooksDb' in your local mongodb database.

Step 2. Check the 'application.properties' file under 'ComicBook/SpringBackend/comics-rest/src/main/resources'.

Step 3. Ensure that 'spring.data.mongodb.database' is equal to 'ComicBooksDb'.

Step 4. If not, then replace it with 'spring.data.mongodb.database=ComicBooksDb'

Step 5. Put the backend into a java IDE of your choice. (This was made using the IntellijIDEA. So, it's recommended to open it in IntelliJ. If your're using the community version, make sure you have some spring plugins installed since the IDE might not recognise Spring's annotations and keywords. If you're using the ultimate version, proceed to the next step.)

Step 6. Update maven to make sure you have all the required dependencies in your .m2 folder for the 'pom.xml' that the Spring backend is going to use. (maven updating methods differ from IDE to IDE. Ask chatGPT or something if you don't know how to do it in your chosen IDE.)

Step 7. Run 'ComicsRestApplication.java' as a 'Spring Boot project'. And voilà! Your backend should be up and running. Normally, it runs on localhost:8080 but i configured it to run on localhost:8090. But you don't need to worry about that since I configured the frontend to fetch from localhost:8090.

============================================================================================================================================================================================================================

The Frontend is split into two parts. The user side and the admin side. They're both written in React.js with TailwindCSS under Vite. You'll need to install NodeJs to run it.

Here's how to download and install NodeJs: https://nodejs.org/en/download

IMPORTANT: The thing is, since I wrote it under Vite, it runs on localhost:5173. But I wrote two seperate sides of it; the user side and the admin side. So, whichever runs first, will go onto localhost:5173 and the one that runs later will default to localhost:5174.

If you have your nodeJS installed, then it's ready to run the frontend. Do this for both sides:

Step 1. (for user side) open terminal under: 'ComicBook/ReactFrontend/ComicBookStoreApp/comicBookStoreApp/'. Then type 'npm run dev' in the terminal.

Step 2. (for admin side) open terminal under: 'ComicBook/ReactFrontend/ComicBookStoreAdminSide/comicBookStoreAdminSideApp/'. Then type 'npm run dev' in the terminal.

Step 3. (Remember, the first one that you ran will be on localhost:5173) Open a browser of your choice. Create two tabs. Then type 'http://localhost:5173' and 'http://localhost:5174' in your respective tabs.

Then, you're all set!


============================================================================================================================================================================================================================

P.S : Replace backslashes with slashes for windows for the file directories.
