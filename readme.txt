
This is client side image cropper. Generally in many live applications, image cropping is done at server side. This project crops the image on
client side and then we can upload it to server. I haven't used existing Jcrop or Cropper.js to get the crop box, where user can drag and select the crop
area from image. Hence the values needs to be given manually. I know that is painful and i will add the functionality soon.

Technologies used :

NodeJS, JS, Express, Jade Rendering Engine, bootstrap

Steps to RUN

1) Pull the project to your local system.
2) Run npm install, it will install all the dependencies required for this project to run.
3) The database is hosted at mlab.com so no need to create the db in local, just make sure you are connected to internate.
4) Now run the server by going to the directory from terminal, and running 'node bin/www'. Hit localhost:3000
5) You will see a page titled 'Image Cropper'
6) Now choose file and choose image file.
7) The image will get rendered on page.
8) Now as i said earlier didn;t created crop box with UI, so give the co ordinates in topX, topY, width, height
9) Now hit crop
10) You will see the image is cropped.
11) Now Upload Image will be visible under crop button, hit it.
12) If it is uploaded to server then you will see a JSON response, giving filePath and mapper.
13) Mapper is used as mapper of file location and a key which is stored in mongoDB. Now hit 'http://localhost:3000/views/uploaded/{{mapper}}'
14) This will render the cropped image.



db name : bottr
collection name : images