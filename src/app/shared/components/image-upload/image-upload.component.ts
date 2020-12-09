import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  imgURL: string | ArrayBuffer;
  @Input() isShowMyInputLogo: boolean | undefined;
  @Input() imagePath: string;
  @Input() type: any;
  @Input() formSubmitted: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showUploadedImage : boolean = true;
  @Output() detectchange = new EventEmitter();
  file: File[];
  apiurl = environment.apiUrl;
  constructor(private fileuploadservice: FileUploadService) { }

  ngOnInit(): void {
  }

  // propagateChange = (_: any) => { };

  upload(file: File[]) {
    let formData = new FormData();
    this.file = file;
    var reader = new FileReader();
    formData.append('Image', this.file[0]);
    formData.append('Type', this.type);
    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {

      this.fileuploadservice.UploadImage(formData).subscribe(x => {
        this.imagePath = x;
        this.detectchange.emit(this.imagePath);
      });
    }
    (success) => {
      this.fileuploadservice.UploadImage(formData).subscribe(x => {
        this.imagePath = x;
        this.detectchange.emit(this.imagePath);
      });
      
    };
  }

  
}
