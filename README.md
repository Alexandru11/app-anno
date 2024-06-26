# annotate-app

Cloud-based Web application for data annotators to easily do text annotations that serve Natural Language Processing tasks. 
The project’s main goal was to come up with a better option in today’s free annotation applications by offering a single Cloud tool for annotators to receive,
assign and collaborate seamlessly on annotation tasks. 

Inbound annotation tasks are received through messaging queue consumer micro-services.

Authentication is done via redirection to Auth0 and using auth0 library.

Check out the other repositories for the micro-services involved in the backend.

## UI Platform Flow

### Tasks tab

User can choose an annotation task and proceed to annotate.

![image](https://github.com/alxdru/app-anno/assets/18479060/c4ad9c9a-6506-4093-93ce-f0fedac18092)

### Annotate tab


#### Main tab

User can read the task description and labels with which annotations can be done. Simply select text by click on words or doing multiple text selection hold click - drag - release.

![image](https://github.com/alxdru/app-anno/assets/18479060/c0f341f3-e409-4994-b181-58683f82bcb6)

#### Annotation Menu

Selected text is being displayed. A label can be chosen.
Menu can either be Closed or Save the annotation.

![image](https://github.com/alxdru/app-anno/assets/18479060/640def08-99e4-4857-be7c-542923a98d82)

### Annotations tab

User's annotations are displayed with their associated task name.

![image](https://github.com/alxdru/app-anno/assets/18479060/6c5b617a-ab4b-4b6c-8355-209864e4198f)

### Statistics tab

User's statistics are displayed. How many Annotated Tasks were completed out of the Open Tasks.

![image](https://github.com/alxdru/app-anno/assets/18479060/964090c7-cb65-43b3-9d51-a1ffe31aa98c)

### List Documents tab

In this tab Users can see conflicted annotations with other annotators and attempt to solve the issue. 
Clicking on Solve under the conflicted user redirects the current user to the actual annotated piece of text corpus and change its label to resolve the conflict.

![image](https://github.com/alxdru/app-anno/assets/18479060/e0b3efbf-ecbc-49d4-8044-f61dfb2d878a)

## Managing annotations

Below I am associating the JSON objects from REST calls with the actual features of the application.

### Labels

These are the types of labels that can be assigned to annotated portions of text. Of course this can be extended with other specific labels.

```json
"parameters": {
"labels": [{
"_id": {
"$oid": "60d6fbbff059c100830017c6"
},
"name": "T_ORG",
"display_name": "Organization"
}, {
"_id": {
"$oid": "60d6fbbff059c100830017c7"
},
"name": "T_LOC",
"display_name": "Location"
}, {
"_id": {
"$oid": "60d6fbbff059c100830017c8"
},
"name": "T_PERS",
"display_name": "Person"
}],}
```

### Annotation Structure

At the end of the annotating process the following JSON structure will be saved:

```json
{
"_id": {
"$oid": "60e76cd5df510e81a0c56f27"
},
"user": {
"id": "auth0|60e485956c9def00704d7aa7",
"name": "First Last",
"email": "email@domain.com"
},
"annotationProperties": [{ // List containing all the annotations realized
"labels": ["Organization"],
"_id": {
"$oid": "60e76cd5df510e81a0c56f28"
},
"entity": "Organization ",
"startPosition": "50", // Start position in the annotated text corpus
"endPosition": "62" // End position in the annotated text corpus
}, {
"labels": ["Person"],
"_id": {
"$oid": "60e76cd5df510e81a0c56f29"
},
"entity": "Person ",
"startPosition": "74",
"endPosition": "80"
}],
"taskId": "60d6fbbaf059c100830017c0",  // UUID of annotation task
"taskText": "This is an annotation task",
"__v": 0
}
```

### Managing Conflicts

There can be cases when parts of the text corpus, that were annotated by multiple users with different labels, raises conflicts.
These conflicts should be resolved before annotations can be used by an NLP system which can produce confusions.

The application can query these kind of conflicts. The JSON objects of these queries rendered by the app look as following:

```json
{
"values": [
{
"conflictedUser": {
"name": "First Last",
"id": "google-oauth2|101297217533613321464",
"email": "email@domain.com" // Email address of annotator the current user conflicted with. Helpful for working on a resolution.
},
"_id": "610e9a7b60f0f00083145078",
"conflictedProperties": [
{
"_id": "610e9a7b60f0f00083145079",
"conflictedEntity": "Watermelon Sugar",
"conflictedStartPos": "167",
"conflictedEndPos": "185"
}
],
"annotationId": "610e9a0760f0f0008314506f",
"taskId": "6108222e8d1404008260e9ea",
"taskText": "Annotate news texts with provided labels" // Provided task text for better clarification to annotators
}
]
}
```

### Annotation Task

```json
{
"_id": {
"$oid": "60bfa444b3dce54f1055b491"
},
"createdAt": "2021-06-08T16:53:52.530Z",
"description": "This is an annotation task",
"maxUsers": 1,
"type": "Entity annotation",
"parameters": {
"labels": [{ // Labels that can be used in this annotation task
"name": "T_ORG",
"display_name": "Organization"
}, {
"name": "T_LOC",
"display_name": "Location"
}, {
"name": "T_PERS",
"display_name": "Person"
}],
"text": "This is task where you need to label text that is Organization, Location, Person..."
}
}
```

## High-level architecture

Deployment was done using SAP BTP, but any other Cloud Provider would do with some minor changes to the actual messaging applications.
The platform components are:

- Microservices for communication with external platforms (Node.js + Event Mesh) // Annotation tasks ingestion
- Microservices for internal communication (Node.js + Event Mesh) // Consumers that read task messages and bring them into the app's storage for consumption
- RESTful APIs for application's tabs (Node.js) // 
- Application that serves as the main GUI (Vue.js)
- Authentication system was done through Auth0
- SAP Event Mesh as messaging service
- Storage with NoSQL MongoDB instance

![image](https://github.com/alxdru/app-anno/assets/18479060/22aae4f9-5143-4a6c-97ee-15a9fa05a529)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
