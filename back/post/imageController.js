const Minio = require('minio');
const Post = require('./postService');

//for local storage

// const minioClient = new Minio.Client({
//     endPoint: 'localhost',
//     port: 9000,
//     useSSL: false,
//     accessKey:'A8BQQ2u7xZTaTBgZYzcB',
//     secretKey:'KuycOtxqzX59YbtlNCwIuAJxSposArIDfwNtTbSL',
//   });

//for docker client

const minioClient = new Minio.Client({
  endPoint: process.env.ENDPOINT,
  port: 9000,
  useSSL: false,
  accessKey: process.env.ACCESSKEY,
  secretKey: process.env.MINIO_SECRET_KEY
});





module.exports.imageProcessing = (req, res) => {

  console.log("aaaaa");
  if (!req.file) {


    console.log(req.body);
    const postDetails = {
      userMail: req.body.userMail,
      content: req.body.content,
      image: '',

    };


    Post.postDBService(postDetails).then((status) => {

      if (status) {

        console.log("j");
      } else {
        console.log("createPost e shomossha");

      }

    }).catch((error) => {

      console.log(error);
    })





    return res.status(400).send('No image file found.');



  }

  const filePath = req.file.path;
  const metaData = {
    'Content-Type': req.file.mimetype,
  };

  //const bucketName = 'picture'; 

  const bucketName = process.env.BUCKETNAME;

  const objectName = req.file.originalname;
  const imageName = req.file.originalname; // Save the image name


  console.log("notun log.....");
  console.log(bucketName, objectName, filePath, metaData);

  console.log(minioClient);

  minioClient.fPutObject(bucketName, objectName, filePath, metaData, async (err, etag) => {

    if (err) {
      console.log(err);
      return res.status(500).send('Error uploading the image.');
    }

    console.log('Image uploaded successfully: ' + objectName);

    const postDetails = {
      userMail: req.body.userMail,
      content: req.body.content,
      image: imageName,
    };



    Post.postDBService(postDetails).then((status) => {

      if (status) {
        console.log("j2");
      } else {
        console.log("createPost e shomossha2");
      }

    }).catch((error) => {

      console.log(error);
    })


    console.log(imageName);

    return res.status(200).send('Image uploaded successfully.');

  });
};

module.exports.getImage = (req, res) => {


  const { imageName } = req.params;


  const bucketName = process.env.BUCKETNAME; // Replace with your desired bucket name
  const objectName = imageName;
  //uploadedImage.objectName;
  module.exports.objectName = objectName;

  console.log(`Fetching image: ${imageName}`);

  minioClient.getObject(bucketName, imageName, (err, dataStream) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Error retrieving the image.');
    }

    const contentType = getImageContentType(imageName);
    res.setHeader('Content-Type', contentType);

    // Pipe the data stream to the response to serve the image
    dataStream.pipe(res);
  });


};

function getImageContentType(imageName) {
  // Implement logic to determine the content type based on the image file extension
  // Example: Check the file extension and return the corresponding content type
  const fileExtension = imageName.split('.').pop().toLowerCase();
  switch (fileExtension) {
    case 'png':
      return 'image/png';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'gif':
      return 'image/gif';
    // Add more cases as needed
    default:
      return 'application/octet-stream'; // Default to binary data
  }
}

