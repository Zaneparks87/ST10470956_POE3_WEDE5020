# Zaneparks Hyper Website
1. Project Overview

Zaneparks Hyper is a retail website developed using HTML, CSS, and JavaScript. The website is designed to allow customers to explore products, learn about the store, make enquiries, contact the business, and use a demonstration order form.

The website focuses on providing a simple and user-friendly shopping experience through an organised layout, interactive features, form validation, and responsive styling.

2. Project Objectives

The objectives of this project are to:

- Develop a multi-page retail website.
- Provide customers with information about the store.
- Display products in an organised catalogue.
- Allow users to search for products and sort them by price.
- Provide contact and enquiry forms.
- Use JavaScript to improve website interactivity.
- Validate user input and display appropriate feedback.
- Create a responsive layout for different screen sizes.
- Apply search engine optimisation (SEO) principles.
- Improve accessibility and usability.
- Maintain project documentation and record development changes.

 3. Technologies Used

The website uses the following technologies:
HTML5
HTML is used to create the structure and content of each webpage, including headings, navigation, forms, images, buttons, and sections.

 CSS
CSS is used to control the appearance of the website, including colours, typography, spacing, layout, responsiveness, and interactive visual effects.

JavaScript
JavaScript is used to add interactive functionality, including catalogue search, price sorting, form validation, feedback messages, and the FAQ accordion.

Visual Studio Code
Visual Studio Code is used to write, edit, and organise the website files.

 Git and GitHub
Git and GitHub can be used to track changes, manage versions, and store the project repository.

 4. Website Pages

The website contains the following pages:
Home — `index.html`
The homepage introduces the store and provides navigation to the other sections of the website.

 Catalogue — `catalogue.html`
The catalogue displays products and allows users to search for products and sort the displayed items by price.

 About Us — `about_Us.html`
The About Us page provides information about the store, including its background, mission, vision, and other relevant business information.

 Order — `order.html`
The order page contains a demonstration order form with customer details, product selection, delivery options, and validation.

Contact — `contact.html`
The contact page allows users to enter their contact details and submit a general message through a validated form.

Enquiry — `enquiry.html`
The enquiry page provides a form for product, order, delivery and other questions. It also contains a Frequently Asked Questions (FAQ) accordion.
 5. Project Folder Structure
The project is organised into HTML pages, a shared stylesheet, JavaScript files, and an assets folder.

ZaneparksHyper/
│
├── index.html
├── catalogue.html
├── about_Us.html
├── order.html
├── contact.html
├── enquiry.html
│
├── styles.css
│
├── javascript/
│   ├── catalogue.js
│   ├── order.js
│   ├── contact.js
│   ├── enquiry.js
│   ├── newsletter.js
│   └── maps.js
│
├── assets/
│   └── Product images
│
├── README.md
├── CHANGELOG.md

6. Main Features
 Navigation
The website provides navigation links to its main pages so users can move between the homepage, catalogue, About Us, order, contact and enquiry sections.

Product Catalogue
The catalogue provides product information and interactive controls.
Features include:
- Product display.
- Product search.
- Price sorting from low to high.
- Price sorting from high to low.

Order Form
The order page includes:
- Customer information fields.
- Product selection.
- Delivery options.
- Input validation.
- Feedback messages.
The order form is a demonstration and does not process real payments unless a secure payment system has been separately created.

Contact Form
The contact page allows users to enter their details and a message. JavaScript validates the input and provides feedback.

 Enquiry Form
The enquiry page allows users to select an enquiry topic and enter their details and question.

The form includes:
- Required-field validation.
- Email validation.
- An optional order reference.
- A minimum message length.
- Success and error feedback.

FAQ Accordion
The FAQ section contains expandable questions. Users can click the plus sign to display an answer and click the minus sign to close it.

 Newsletter Form
The newsletter form checks the email address and provides feedback to the user.
Unless a mailing-list service has been connected, the form does not save email addresses or subscribe users to a real newsletter.

Interactive Map
A map can be displayed on the homepage using JavaScript and an embedded map.

7. JavaScript Files
The JavaScript files are organised in the `javascript` folder.

JavaScript file | Purpose 
catalogue.js > Handles catalogue interactions such as searching, sorting, and other implemented catalogue features.
order.js > Handles order form validation and delivery-option behaviour. 
contact.js > Validates the contact form and displays feedback. 
enquiry.js > Handles enquiry form validation and FAQ accordion interactions. 
newsletter.js > Validates newsletter form input and displays feedback. 
maps.js > Adds the embedded map if the map container and script are configured. 

8. Design and User Experience

The design aims to provide:
- Clear navigation.
- Readable text.
- Consistent spacing and layout.
- Clearly labelled forms.
- Helpful validation messages.
- Interactive buttons and FAQ controls.
- A layout that adapts to different screen sizes.

9. SEO and Accessibility

Search engine optimisation and accessibility should be considered throughout the project.

SEO checks include:
- Meaningful page titles.
- Relevant meta descriptions.
- Appropriate headings.
- Descriptive internal links.
- Relevant image alternative text.
- Optimised image sizes.
- Correct page and asset paths.

Accessibility checks include:
- Labels associated with form controls.
- Useful alternative text for meaningful images.
- Keyboard-accessible buttons and interactive controls.
- Visible keyboard focus indicators.
- Appropriate colour contrast.
- Clear error and success messages.
- Correct heading structure.

10. How to Run the Website

Follow these steps to run the project locally.

1. Download or clone the project repository.
2. Open the `ZaneparksHyper` folder in Visual Studio Code.
3. Confirm that the HTML files, `styles.css`, `javascript` folder, and `assets` folder are present.
4. Open `index.html` in a web browser, or use the Live Server extension in Visual Studio Code.
5. Navigate through the website using the navigation links.
6. Test the interactive features and forms.
7. Check the browser developer console for JavaScript errors.

11. Testing

- Opening every webpage.
- Checking all navigation links.
- Confirming that product images load.
- Searching for products.
- Testing both price-sorting options.
- Opening and closing every FAQ item.
- Submitting forms with empty fields.
- Testing invalid email addresses.
- Submitting forms with valid information.
- Checking order delivery options.
- Confirming that feedback messages appear correctly.
- Testing the website on desktop and mobile screen sizes.
- Checking the browser console for errors.
- Confirming that CSS and JavaScript files load correctly.

12. Forms and Current Limitations

The website uses JavaScript for client-side form validation and feedback.

Client-side validation helps users identify missing or incorrectly entered information. However, it does not automatically send data to a server.
Unless a backend or form-handling service has been connected and tested:
- The enquiry form does not send messages to the store.
- The contact form does not send messages to the store.
- The newsletter form does not save subscribers.
- The order form does not create a real order or process payment.
13. Future Improvements
Possible future improvements include:

- Connecting enquiry and contact forms to a backend.
- Implementing AJAX form submission if required.
- Adding secure order processing and payment integration if needed.
- Connecting the newsletter form to a mailing-list service.
- Confirming and improving mobile navigation.
- Adding a product gallery lightbox if required.
- Improving image compression and page performance.
- Adding and testing `robots.txt` and `sitemap.xml` if required.
- Testing and improving accessibility.
- Deploying the website and testing the live version.

## 14. Documentation

The project includes the following documentation files:

- `README.md` — describes the project, structure, features, setup, and limitations.
- `CHANGELOG.md` — records project changes, fixes, and improvements.

## 15. Author

**Project name:** Zaneparks Hyper  
**Project type:** Retail website  
**Main technologies:** HTML5, CSS3, and JavaScript  
**Development environment:** Visual Studio Code

## 16. Conclusion

Zaneparks Hyper is a multi-page retail website project designed to demonstrate website structure, styling, JavaScript interactivity, form validation, usability, and SEO principles.
