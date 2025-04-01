---
pubDate: "May 14, 2023"
author: Tonie Santos
title: "Automatically Import Leads From Your Website to Your CRM Using API"
description: "As a flight school, your website is your primary means of communication with prospective student pilots. It's important to provide a smooth and streamlined experience for visitors, so they can easily find the information they need and take the next steps toward becoming a student pilot."
heroImage: "/blog/screen-shot-discovery-flight-form.webp"
readingTime: 4
category: "Marketing"
tags: ["CRM"]
---

As a flight school, your website is your primary means of communication with prospective student pilots. It's important to provide a smooth and streamlined experience for visitors, so they can easily find the information they need and take the next steps toward becoming a student pilot.

One of the most crucial pieces of information you'll need from visitors is their contact information. This allows you to follow up with them and provide personalized assistance as they move through the enrollment process. However, manually entering contact information into a CRM (Customer Relationship Management) tool can be time-consuming and prone to errors.

Fortunately, it's possible to automate this process by integrating your website's contact form with your CRM using an API (Application Programming Interface). This allows information to be passed from your website directly into your CRM, saving you time and reducing the risk of errors.

One popular CRM tool that can be used for flight schools is Less Annoying CRM (LACRM). LACRM is a cloud-based CRM designed for small businesses, with a focus on simplicity and ease of use. For an affordable subscription, it’s a great choice for flight schools looking for a straightforward way to manage their student pilot leads and contacts.

Note: Right Rudder Marketing is not affiliated with LACRM. We provided API enablement to one of our customers who is a customer of LACRM at their request.

To integrate your website's contact form with LACRM, you'll need to create an API key in your LACRM account. This key will be used to authenticate your website's requests to LACRM. Once you have your API key, you can use it to send contact information from your website to LACRM using HTTP requests.

Here's an example of how to use the LACRM API to add a new contact with a name, phone number, and email address. The sample code in LACRM website is PHP. The code below is in Ruby.

    require 'httparty'
    require 'json'

    class Contact < ApplicationRecord
    before_save :to_lacrm

    def to_lacrm # Replace with your API key or retrieve from an environmental variable. # Production code should not show the Key.
    api_key = "your_api_key_here"

    # Set the endpoint and headers
    endpoint = "https://api.lessannoyingcrm.com/v2/"
    name = self.first_name + ' ' + self.last_name



    headers = {
        "Authorization" => "#{api_key}",
        "Content-Type" => "application/json"
    }


    payload = {
        "Function" => "CreateContact",
        "Parameters" => {
            "IsCompany" => false,
            "AssignedTo" => "850228" ,  #Test ID to be replaced with LACRM USERID
            "Name" => "#{name}",
            "Email" => "#{self.email}",
            "Phone" => "#{self.phone}",
        }
    }


    # Make the POST request to create the contact
    # response = HTTParty.post(endpoint, headers: headers, body: contact_data.to_json)
      response = HTTParty.post(endpoint, headers: headers, body: payload.to_json)
      if response.code == 200
        # API Contact created successfully
        #Save the CRM Contact Id in the website app and provide a link in the admin account to link to CRM.
        self.lacrm_contact_id = JSON.parse(response.body)['ContactId']
      else
        # API Contact is NOT successful.
        self.lacrm_contact_id = 0
      end
      # You don’t want to show an error to the visitor but instead save the response code.
      # Then, Admin will manually add the contract to CRM.
      # He/she can contact LACRM support about the failure by providing them the response code and body.
      self.lacrm_response_code = response.code
      self.lacrm_response_body = response.body

      end
    end

In this code, you'll need to replace 'your_api_key_here' with your actual LACRM API key. The payload hash contains the name, phone number, and email address of the new contact you want to add to LACRM. The code sends an HTTP POST request to the LACRM API with the contact data in JSON format.

If the contact is added successfully, the API will return the CRM contact id.
If there's an error, the API will return a message however, we don’t want to show the failure but instead, save the response code and the body message. The site admin can contact LACRM support about the failure by providing them the response code and body.

By integrating your website's contact form with LACRM using the API, you can ensure that you capture all the necessary contact information from prospective student pilots and easily manage your leads and contacts. This can help you provide better service to your students and improve your enrollment rates.

Whether you need help with website development, API integrations, or other digital marketing services, Right Rudder Marketing is here to help. Contact us today to learn more about how we can help your flight school succeed.
