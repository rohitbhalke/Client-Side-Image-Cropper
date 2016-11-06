/**
 * Created by bhalker on 06/11/16.
 */
window.onload = function(){

    var inp, cropBtn,targetImage,currentImage,upload,croppedImage,imageName,preview,ctx, container, uploadForm;

    inp = document.getElementById('input');
    cropBtn = document.getElementById('crop');
    targetImage = document.getElementById('targetImage');
    currentImage = document.getElementById('currentImage');
    upload = document.getElementById('upload');
    croppedImage = document.getElementById('croppedImage');
    imageName = document.getElementById('imageName');
    preview = document.getElementById('preview');
    container = document.getElementById('cropDetails');
    uploadForm = document.getElementById('uploadForm');


    inp.addEventListener('change',loadCanvas);
    cropBtn.addEventListener('click', cropImage);

    function loadCanvas()
    {
        var filesToUpload = document.getElementById('input').files;
        var file = filesToUpload[0];

        var img = document.createElement("img");
        var reader = new FileReader();

        reader.onload = function(e)
        {
            img.src = e.target.result;

            var canvas = document.createElement("canvas");
            canvas.setAttribute('id','canvas');
            preview.appendChild(canvas);

            ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0);

            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 800;
            var width = img.width;
            var height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 00, 00, width, height);

            var dataurl = canvas.toDataURL("image/png");
            currentImage.src = dataurl;
            currentImage.dataset.imageName = inp.value.substr(inp.value.lastIndexOf('\\')+1);
            targetImage.src = dataurl;
            //show container
            container.classList.remove('hide');
        };
        reader.readAsDataURL(file);
    }

    function cropImage(){

        var topX,topY,width,height;
        topX = document.getElementById('topX').value || 0;
        topY = document.getElementById('topY').value || 0;
        width = document.getElementById('width').value || 0;
        height = document.getElementById('height').value || 0;

        var canvas = document.getElementById("canvas");

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(currentImage, topX, topY, width, height, 0, 0, canvas.width, canvas.height);

        var dataurl = canvas.toDataURL("image/png");
        targetImage.src = dataurl;

        croppedImage.value = dataurl;
        imageName.value = currentImage.dataset.imageName;
        uploadForm.classList.remove('hide');
    }

};

