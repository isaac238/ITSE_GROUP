## How to use Git & GitHub

### Overview of Git
Git is a version control system used for locally tracking the history of a project on your machine. GitHub is an online service that interacts through git to store projects and their histories and branches in the cloud as well as to make git projects accessible to a large number of people rather than just the local user. When a repo is created on GitHub there are 3 main ways to access it. The first is the least used one GitHub codespaces, this is where you open a copy of VS Code in your browser on GitHub and edit the repo directly. The second method is Live Repos, a Microsoft plugin on VSCode that allows users to directly edit a repo from their local machine. Finally, the 3rd method is the most used one, cloning, this works by logging into git on your local machine and creating a copy of a project on your machine using `git clone`, this cloned copy can then be interacted with without causing issues on the main repo that everyone works on, users can make changes to their local copy of the code and work on features and bugs that they wish to before pushing these updates to the GitHub repo in the cloud using `git push`.


### The workflow
1. Create or choose an issue (You may be assigned to some that you can do).
2. Create a new branch relating to that issue by clicking the create new branch button in the sidebar.
3. Checkout the new branch on your chosen IDE e.g. VS Code, NVIM, VIM, EMACS, JetBrains etc...
4. Make your changes.
5. While making your changes use git commit to add any changes you make to your local git repo.
6. After making all the changes or adding any files you need and commiting them to your local repo you can push it to the GitHub repo.
7. After pushing to the GitHub repo go to the branch on GitHub and click "create pull request".
8. Structure your pull requests in a readable format clearly outlining the changes made and the issues it resolves.
9. GitHub actions if setup will automatically run tests on your repo, if you are writing new code please try and write new unit tests.
10. Wait for 2 group members to review your pull request and ensure that no obvious errors are found
11. If errors are found in your code or a group member suggests a change, they can either make that change themselves or you can go back and make the change before resubmitting your pull request.

### Issues
#### Choosing an issue
Issues will be created either on the Projects page or just directly in the issues tab.
You can assign yourself to an issue using the Assignees button if you are not already assigned or have agreed to do a part of the project.

![image](https://user-images.githubusercontent.com/33090779/221971943-ed0241cb-c37c-4394-b19d-b8bcabe92301.png)

#### Creating an issue
To create an issue you can either use the projects page

![image](https://user-images.githubusercontent.com/33090779/221972158-743390a0-b17f-40b1-9d43-768538cf51b9.png)
Or the issues page

![image](https://user-images.githubusercontent.com/33090779/221972284-ee75aeec-5909-4ad9-a903-1a734514a11e.png)

### Branches
#### Creating a branch
To create a branch relevant to an issue you will need to go to the issue and then on the sidebar under development click Create a branch for this issue.


![image](https://user-images.githubusercontent.com/33090779/221973583-94e504bf-4b3b-492e-8cc7-880d4e2bd73b.png)

#### Opening the branch locally
To open the branch on your local machine and start working on it you first need to go to your cloned repo in your IDE e.g. vscode, nvim etc... You then need to access the terminal or Source Control section of your ide and pull from origin
#### Terminal
`> git fetch`

`> git checkout branch-name`

### Comitting and Pushing

#### Terminal
First you need to stage any files that you would like to commit using:
`> git add [filename]`

Next you need to commit these updated files to your local repo using:
`> git commit -m [message]`
A good resource for commit messages is [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)

Finally push your commits to the branch on GitHub using push:
`> git push origin`

### Pull Requests
To make a pull request you need to go to the branch that you have pushed to. GitHub will display a banner telling you how many commits ahead and behind the branch is. First ensure that the branch is synced with the current main branch therefore being 0 commits behind. To do this run the command `git fetch`. It is then ok to make the pull request. The request should contain a list of all the changes made in this pull as well as a list of any issues it resolves using the Close or Resolve keywords e.g.
- Resolves #1
- Closes #2
Creating a pull request that looks like this.

![image](https://user-images.githubusercontent.com/33090779/222029238-9206fc4b-b4b2-4b61-9336-eae34cca27ad.png)
