import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cropImage';

  display = 'block';
ulpoadedFiles: any = [];
imgId: any=0;
target: any = {};
files: any = {};
event: any = {};
developer: any = {};
frontEndLanguages: any = [];
backEndLanguages: any = [];
selectedBackEndItems: any = [];
selectedFrontEndItems: any = [];
imageChangedEvent: any = '';
croppedImage: any = '';
currentProcessingImg: any = 0;
isManuel: any = 0;


finalImageList: any = [];
constructor() { }

ngOnInit() {
  
}
// openModal() {
//      this.display = 'block';
// }

// onCloseHandled() {
//   this.imageChangedEvent = null;
//   this.display = 'none';
// }


fileChangeEvent(event: any): void {
  //Processing selected Images 
  for (var i = 0; i < event.target.files.length; i++) {
    this.imageProcess(event, event.target.files[i]);
  }
}

imageProcess(event: any, file: any) {
  //Setting images in our required format
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    this.imgId = this.imgId + 1;
    this.ulpoadedFiles.push({ imgId: this.imgId, imgBase64: reader.result, imgFile: file });
  };
console.log(this.ulpoadedFiles);
setTimeout(()=>{
  this.cropImage(1,this.isManuel);
},100)

}

//get a Image using Image Id to crop
//cropping process done here 
cropImage(imgId,isMenuel) {
  this.isManuel = isMenuel;
  this.currentProcessingImg = imgId;
  var imgObj = this.ulpoadedFiles.find(x => x.imgId === imgId);
  
  if (imgObj === undefined) {
  this.imageChangedEvent = event;
    return
  }
  //created dummy event Object and set as imageChangedEvent so it will set cropper on this image 
  var event = {
    target: {
      files: [imgObj.imgFile]
    }
  };
  this.imageChangedEvent = event;
 // this.openModal();
}

//Save Cropped Image locally
SaveCropedImage() {
  var imgObj = this.ulpoadedFiles.find(x => x.imgId === this.currentProcessingImg);
  imgObj.imgBase64 = this.croppedImage;
 // this.onCloseHandled();
 if (!this.isManuel) {
  this.cropImage(this.currentProcessingImg + 1,this.isManuel);
 }else{
  this.imageChangedEvent = event;
 }
}

SaveAllImages() {
  this.finalImageList = null;
  this.ulpoadedFiles.forEach(imgObject => {

    this.finalImageList.push(imgObject.imgBase64);
  })
}

imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
}
imageLoaded() {
  // show cropper
}
cropperReady() {
  // cropper ready
}
loadImageFailed() {
  // show message
}


}
