
# TurboTerms

  

**TurboTerms is a powerful vocabulary learning web application that helps you enhance your language skills through interactive quizzes.**

Have you ever wanted to selfhost a vocabulary learning application? Most likely not, but for those of you that do: TurboTerms is for you!

TurboTerms is free to use on my [public instance](https://turboterms.thebeaconcrafter.club) or you can selfhost it. It doesn't use much server processing power, as almost everything is done **clientside**.

TurboTerms was created to support students that don't want to pay for learning tools.

![Turboterms](https://github.com/TheBeaconCrafter/TurboTerms/blob/main/img/turbotermspresentation.png?raw=true)
## Features
-  **Flashcard Quizzes:** Practice and reinforce your vocabulary with flashcard-style quizzes.
-  **Multiple Choice Mode:** Engage in multiple-choice quizzes for a fun and challenging learning experience.
-  **Text Mode:** for learners who prefer a more detailed and in-depth approach to vocabulary acquisition.
-  **Customizable Settings:** Adjust settings such as partial credit and accuracy threshold to tailor the learning experience.
-  **Import and Export:** Easily import and export vocabulary sets to share or save your progress.
-  **Vocab Set Builder:** Create your own Vocab Sets and study them using TurboTerms.
-  **PWA Support:** TurboTerms supports the principle of Progressive Web Apps, so you can add it to your HomeScreen and use it like an app!
-  **Offline Support:** You don't need to be online and waste your precious cellular data to use TurboTerms. Once opened, it will be cached and work offline!

## Getting started
1. Start by downloading the sourcecode of the [latest release](https://github.com/TheBeaconCrafter/TurboTerms/releases) from the sidebar or cloning this repository.
2. Move the files to the root directory (or practically wherever you want) of your webserver (for example Apache, nginx)

You could now also selfhost a server that handles requests to a filestorage for your vocab sets. This is only recommend for public instances where you want all users to access specific vocab sets. If you don't need that, skip to step 6. If you want to set up a server, please continue reading.

3. To set up the server, please download it from [here](https://github.com/TheBeaconCrafter/turbotermsserver). (It might not be available yet!)
4. Run the server with node after installing all required packages. You can also create a systemctl config.
5. In your client directory, there is a file called "secretsExample.js". Rename it to secrets.js and enter your serverURL and fileStorageURL.

The server should now be ready.

6. Open up config.js and change your version number if you want. Here you can also remove the server feature if you don't want to use it.
7. Start your webserver and navigate to where you installed TurboTerms.

**You now have your very own instance of TurboTerms!**

By Vincent Wackler