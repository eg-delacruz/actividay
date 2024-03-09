# Actividay

![](https://raw.githubusercontent.com/eg-delacruz/actividay/master/assets/images/logo.png)

![](https://img.shields.io/github/stars/eg-delacruz/actividay) ![](https://img.shields.io/github/forks/eg-delacruz/actividay) ![](https://img.shields.io/github/issues/eg-delacruz/actividay)

# Project description

Alone at home without any ideas of what to do now?
Get inspiration by getting random ideas for your next big plan!
Just do not stay on the couch... 😉

**Table of Contents**

[TOCM]

[TOC]

#Features

- Fetching of four initial activity ideas
- Add another random activity to the existing list of activities
- Eliminate the activities you do not like from the list
- Edit the title, URL, category of participants amount of existing activities on the list
- Add custom activities to the list if you do not like the random suggestions
- Responsive UI for different screen sizes
- Visualize the UI in light or dark mode

#Technologies and justification

- React with Next JS framework
  The Next JS framework (v 14.1.2) was used because of the prebuild structure and low configuration needed to start a React project. Also a good choice to create a single pag application.
- TypeScript
  Used to take advantage of its benefits over JavaScript, like the use of interfaces and prevention of possible errors when passing data withing the app
- Redux
  Used to store the Activities data and to give access to that data among the different components
- SASS
  Used as an alternative over pure CSS. It allows us to make use of functions and mixins that can be reused.
- Next-themes
  A library that facilitates the implementation of different UI themes. In this case, it was used to provide light and dark mode
- Sweetalert 2
  Library used to create confirmation notifications when the user successfully (or unsuccessfully) completed an action/task.

#Further implementations for the future
Below are some ideas that could be implemented in the future to improve or extend the functionallity of the application:

- Possibility to filter activities from the list by category or range of participants
- A searchbar to easily find activities from the list
- Give the user the possibility to login, in order to be able to store his/her favourite activities
- After logged in, the user could share its activity list with other app users
