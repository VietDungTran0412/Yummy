# Yummy Vue Project

## Overview
<p>This project aimed at creating a responsive web application which empowered users to share 
and access crowdsources dining establishment reviews from around the world. The project adopted Yelp Fusion API
for data retrieval.
</p>

<p>The project is a custom project in the unit Interface Design and Development at Swinburne University.
The project is an interface-based web project so there is no backend or server development. The deployment of the project
was comprehensively in Amazon Web Services</p>

![Project Logo](images/application-cover-page.png)

## Technologies
- Front-end: [VueJS](https://v2.vuejs.org/), [TailwindCSS](https://tailwindcss.com/docs/installation), [Vuetify](https://vuetifyjs.com/en/)
- API: [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)
- Deployment: [Amazon CloudFront](https://aws.amazon.com/cloudfront/), [Amazon S3](https://aws.amazon.com/s3/)

## Project setup
### 1. Install packages and dependencies
```bash
npm install
```

### 2. Start The Application
<span>Before running the application, please [install packages and dependencies](#1-install-packages-and-dependencies). Run the following command after all the packages and dependencies have been installed</span>

```bash
npm run serve
```

### 3. Compiles and minifies for production
```bash
npm run build
```


### 5. Set Up Yelp Fusion API

This project requires an external API called Yelp API which enables the application to retrieve the information about restaurants
and their reviews throughout the world. For more information about Yelp API, please refer to [Yelp Fusion API Documentation](https://docs.developer.yelp.com/docs/fusion-intro).
<br/>

## Features

### Search Your Restaurant
![Search Your Favorite](images/application-search-result.png)

### Tracking Restaurant Details
![Restaurant Review](images/application-restaurant-details.png)

### Tracking The Reviews
![Restaurant Review](images/application-restaurant-review.png)

### Leave A Review
![User Review Input](images/application-user-review.png)

## Deployment
The application is fully deployed into AWS. The purpose of the deployment phase is to prove the paramount importance of 
Content Network Delivery (CDN) in front-end performance optimization. For simplicity, Amazon CloudFront and S3 would be 
employed

<br/>

The project employed Terraform to provision the whole infrastructure for the application in AWS. Note that it is required
to navigate to the `/tf` directory to run terraform.

### Provision AWS Infrastructure
Initialize Terraform state
```bash
terraform init
```

<br/>

Provision the Infrastructure
```bash
terraform apply -var-file=variables -auto-approve
```

<br/>

It is required to modify the `./tf/variables.tfvars` file in order to modify the region and the bucket name. <br/>

Once the infrastructure in AWS has been successfully applied, build the application. The plain application in HTML, CSS, and JS would be located in `dist` directory. Upload all the build files into the root directory in S3 <br/>

The application will now be accessible via both CloudFront origin and S3 endpoint. 

