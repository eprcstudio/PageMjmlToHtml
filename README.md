# PageMjmlToHtml

A module allowing you to write your Processwire template using MJML and get a converted HTML output using MJML API.

<img width="1440" alt="Capture d’écran 2021-12-02 à 19 05 54" src="https://user-images.githubusercontent.com/6616448/144493657-8f95585c-8d25-4e33-a33e-d89a11c57ee5.png">

Modules directory: [https://processwire.com/modules/page-mjml-to-html/](https://processwire.com/modules/page-mjml-to-html/)

Support forum: [https://processwire.com/talk/topic/26466-pagemjmltohtml/](https://processwire.com/talk/topic/26466-pagemjmltohtml/)

## About

Created by [Mailjet](https://www.mailjet.com/), [MJML](https://mjml.io/) is a markup language making it a breeze to create newsletters displayed consistently across all email clients.

Write your template using MJML combined with Processwire’s API and this module will automatically convert your code into a working newsletter thanks to their free-to-use [Rest API](https://mjml.io/api/).

## Prerequisite

For this module to work you will need to get an [API key](https://mjml.io/api/) and paste it in the module’s configuration.

## Usage

Once your credentials are validated, select the template(s) in which you’re using the MJML syntax, save and go visualize your pages to see if everything’s good. You will either get error/warning messages or your email properly formatted and ready-to-go.

From there you can copy/paste the raw generated code in an external mailing service or distribute your newsletter using [ProMailer](https://processwire.com/store/pro-mailer/).

## Options

In the module settings, you can choose to remove the prepended/appended files when using [Markup Regions](https://processwire.com/docs/front-end/output/markup-regions/).

By default the module caches the output to avoid repetitive API calls. You can add GET variables for which you would like to have different cached outputs. You can also bypass the cache altogether for specific roles.

You also have the option to convert relative URLs into absolute ones and even specify the prepended host and/or appended query parameters

## Features

- The MJML output is cached to avoid repetitive API calls
  - Not cached if there are errors/warnings
  - Cleared if the page is saved
  - Cleared if the template file has been modified
- A simple (dumb?) code viewer highlights lines with errors/warnings
- A button is added to quickly copy the raw code of the generated newsletter
  - Not added if the page is rendered outside of a PageView
  - Only visible to users with the page’s edit permission
- A shortcut is also added under “View” in the edit page to open the raw code in a new tab
- Multi-languages support

<img width="1440" alt="Capture d’écran 2021-12-02 à 21 21 45" src="https://user-images.githubusercontent.com/6616448/144499706-8efa65bc-39c5-43fc-b570-cc93670f778d.png">

## Notes

The code viewer is only shown to superusers. If there’s an error the page will display:
- Only its title for guests
- Its title and a message inviting to contact the administrator for editors

If your layout looks weird somehow, try disabling the minification in the options.