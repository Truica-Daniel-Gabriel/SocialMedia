import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreatePostRequest } from 'src/app/@core/models/post';
import { EncodedImageFileService } from 'src/app/@core/services/encoded-image-file.service';
import { PostService } from 'src/app/@core/services/post.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
})
export class ModalDialogComponent {
  public previewImage!: string | ArrayBuffer | null;
  public section: number = 1;

  public postCredentials = this.formBuilder.group({
    location: ['', [Validators.required, Validators.minLength]],
    description: [''],
  });

  constructor(
    private readonly encodedImageFileService: EncodedImageFileService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<any>,
    private readonly postService: PostService,
    private readonly snackBar: MatSnackBar
  ) {}
  public onNextModal(): void {
    this.section = 2;
  }

  public onChangeImage(event: EventTarget | null): void {
    const file = (event as HTMLInputElement).files?.[0];
    if (file) {
      this.encodedImageFileService
        .convertToBase64(file)
        ?.then((convertedImage: string | null | ArrayBuffer) => {
          this.previewImage = convertedImage;
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
  }

  public onSendPost(): void {
    if (this.postCredentials.valid) {
      this.postService.createPost({imageUrl: this.previewImage, ...this.postCredentials.value} as CreatePostRequest).subscribe({
        next:({message})=>{
          this.snackBar.open(message, '', {
            duration:5000
          })
        },
        error:({message})=>{
          this.snackBar.open(message, '', {
            duration:5000
          })
        }
      })
      this.dialogRef.close();
    }
  }
}
