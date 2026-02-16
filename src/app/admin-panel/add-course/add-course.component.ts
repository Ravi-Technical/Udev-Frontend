import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { AdminServiceService } from '../service/admin-service.service';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../../component/shared/success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SnakbarMessageService } from '../../component/shared/snakbarMessage/snakbarService.service';
import { LoaderService } from '../../component/services/loaderService.service';


@Component({
  selector: 'app-add-course',
  imports: [CommonModule, ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    NgxEditorModule,
    MatIconModule
  ],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCourseComponent implements OnInit, OnDestroy {
  addCourseForm!: FormGroup;
  wholeCategories: any[] = [];
  levels: string[] = ['All Levels', 'Beginner', 'Intermediate', 'Expert'];
  languages: string[] = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Mandarin Chinese', 'Japanese', 'Korean', 'Russian',
    'Portuguese', 'Arabic', 'Italian', 'Bengali', 'Turkish', 'Tamil'];
  editor!: Editor;
  readonly stars = 5;
  readonly rating = signal(0);
  readonly hoverd = signal<number | null>(null);
  isEditMode: Boolean = false;
  currentCourseId: string | null = "";
  editRating: number = 0;
  imageUrl: any;
  videoFileName:any;
  imageFileName:any;

  constructor(private adminService: AdminServiceService, private fb: FormBuilder, private matDailog: MatDialog, private snakbar$: SnakbarMessageService,
    private router: Router, private activeRoute: ActivatedRoute, private loader:LoaderService
  ) { }

  ngOnInit(): void {
    this.editor = new Editor();
    this.initializeForm();
    this.getAllCategories();
    this.currentCourseId = this.activeRoute.snapshot.paramMap.get('id');
    if (this.currentCourseId) {
      this.getSingleCategoryById(this.currentCourseId);
      this.isEditMode = true;
    }
  }
  // Initialize from fields
  initializeForm() {
    const randomCourseCode = crypto.randomUUID();
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      courseVideo: ['', Validators.required],
      courseContent: [''],
      thumbnailImage: [''],
      categoryId: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      courseCode: [{ value: randomCourseCode, disabled: true }],
      language: ['', Validators.required],
      level: [''],
      enrollCount: [0],
      isFeatured: [false],
      lastUpdate: [new Date().toISOString()],
      certificateAvailable: [false],
      ratings: [0],
      timestamp: [new Date()],
      totalHours: [0, Validators.min(0)],
      instructors: ['', Validators.required],
      status: [true]
    });
    this.addCourseForm.patchValue({ courseCode: randomCourseCode });
  }
  // Get Course By Id
  getSingleCategoryById(id: string) {
    this.adminService.udemyGetSingleCourseById(id).subscribe({
      next: (result) => {
        if (this.isEditMode && this.currentCourseId) {
          this.editRating = result.ratings;
        }
        this.addCourseForm.patchValue(result);
        const imageUrl = this.addCourseForm.get('thumbnailImage')?.value;
        const courseVideoUrl = this.addCourseForm.get('courseVideo')?.value;
        this.imageFileName = this.extractFileName(imageUrl);
        this.videoFileName = this.extractFileName(courseVideoUrl); 
      },
      error: (error) => { }
    })
  }
  // Extract File Name
  extractFileName(url:string){
     if(!url) return '';
     return url.split('/').pop()!;
  }
  // Image Upload on Cloudinary
  onSelectImage(event:any){
      const file = event.target.files[0]; 
      if(!file) return;
      this.adminService.uploadImage(file).subscribe({
        next:(result:any)=>{ 
            this.loader.hide();
            this.addCourseForm.patchValue({
              thumbnailImage:result.secure_url
            })
        },
        error:()=>{}
      })
  }
  // Course Video upload on Cloudinary
  onSelectVideo(event:any){
    const file = event.target.files[0];
    if(!file) return;
    this.adminService.uploadCourseVideo(file).subscribe({
       next:(result:any)=> {
        this.loader.hide();
        this.addCourseForm.patchValue({
          courseVideo:result.secure_url
        })
       },
       error:()=>{}
    })
  }
  // Get All Category
  getAllCategories() {
    this.adminService.udemyGetAllCategories().subscribe({
      next: (result) => {
        if (result) {
          this.wholeCategories = result;
        }
      }, error: (error) => { }
    })
  }
  // Add Course Here
  onSubmit() {
    this.addCourseForm.value.ratings = this.rating();
    const formData = this.addCourseForm.value;
    if (this.isEditMode && this.currentCourseId) {
      this.addCourseForm.value.lastUpdate = new Date(); 
      this.adminService.udemyUpdateSingleCourseById(this.currentCourseId, this.addCourseForm.value).subscribe({
        next: (result) => {
          if(result){
             this.snakbar$.success("Course has been updated successfully");
          }
        },
        error: (err) => { }
      }) 
      this.addCourseForm.reset();
      // this.addCourseForm.value.courseCode = '';
      // this.addCourseForm.value.ratings = '';
    } else {
      console.log('Form Data to be submitted:', formData);
      if (this.addCourseForm.valid) {
        this.adminService.udemyAdminAddCourse(formData).subscribe({
          next: (result: any) => {
            if (result.success) {
              this.addCourseForm.reset();
              this.initializeForm();
              this.addCourseForm.value.courseCode = '';
              this.addCourseForm.value.ratings = '';
              this.matDailog.open(SuccessDialogComponent, {
                width: '500px',
                data: { title: "Course Added Success", message: 'Course has been added successfully.' }
              });
            }
          },
          error: (error) => { }
        })
      }
    }
    this.router.navigate(['/admin/course-list']);
  }
  // On Reset 
  onReset() {
    this.addCourseForm.reset();
  }
  // Rating Call
  setRating(value: number) {
    if(this.isEditMode) this.editRating = value;
    this.rating.set(value);
  }
  setHover(value: number) {
    this.hoverd.set(value);
  }
  // Prevent re-rendering of all elements in *ngFor
  trackByIndex(index: number): number {
    return index;
  }
  ListCourse() {
    this.router.navigate([`admin/course-list`]);
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }
  AddCourse() {
    this.router.navigate([`admin/add-course`]);
  }


} // END CLASS HERE
