import { CourseActionComponent } from "../course-action/course-action.component";



export const column_Defs = [
    { field: 'actions', cellRenderer: CourseActionComponent, cellClass: 'actions-cell', sortable: false, filter: false },
    { field: 'id' },
    { field: 'title', sortable: true, filter: true },
    { field: 'description', sortable: true, filter: true },
    { field: 'courseVideo', sortable: true, filter: true },
    { field: 'courseContent', sortable: true, filter: true },
    {
        field: 'thumbnailImage', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            return `<img class="img-wrap" src="${params.value}" alt="Course Thumbnail Image">`;
        }
    },
    { field: 'categoryId', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
    { field: 'courseCode', sortable: true, filter: true },
    { field: 'language', sortable: true, filter: true },
    { field: 'enrollCount', sortable: true, filter: true },
    {
        field: 'isFeatured', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            if (params.value) {
                return `<p class="active">Yes</p>`;
            }
            return `<p class="deactive">No</p>`;
        }
    },
    {
        field: 'lastUpdate', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            if (!params.value) return '';
            let formatted = new Date(params.value).toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            formatted = formatted.replace('am', 'AM').replace('pm', 'PM');
            return formatted;
        }
    },
    {
        field: 'certificateAvailable', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            if (params.value) {
                return `<p class="active">Yes</p>`;
            }
            return `<p class="deactive">No</p>`;
        }
    },
    { field: 'ratings', sortable: true, filter: true },
    {
        field: 'timestamp', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            if (!params.value) return '';
            let formatted = new Date(params.value).toLocaleString('en-US', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            formatted = formatted.replace('am', 'AM').replace('pm', 'PM');
            return formatted;
        }
    },
    { field: 'totalHours', sortable: true, filter: true },
    { field: 'instructors', sortable: true, filter: true },
    { field: 'level', sortable: true, filter: true },
    {
        field: 'status', sortable: true, filter: true,
        cellRenderer: (params: any) => {
            if (params.value) {
                return `<p style="color:green">Active</p>`;
            }
            return `<p style="color:red">De-active</p>`;
        }
    },

];


