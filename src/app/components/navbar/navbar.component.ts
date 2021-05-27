import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../servicios/servicio.service'
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public productsFrom = this.fb.group({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    id: new FormControl({value: '', disabled: false}, Validators.required)
  });

  loading = false;
  formProduct: FormGroup;
  closeResult = '';
  

  constructor(private serviceService: ServiceService, private builderService: FormBuilder, private fb: FormBuilder, private modalService: NgbModal, private routerService: Router) { 
    this.formProduct = this.builderService.group({
      name: ['', Validators.required],
      grades: [{}],
      image:'',
      branchId: ['', Validators.required],
      createdById: ['', Validators.required],
      color: [''],
      inCalculator: false,
      icon: [''],
    })
  }

  ngOnInit(): void {
  }

  nuevoProducto(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  crearProducto(values){
    values = {
      name: this.formProduct.value.name,
      grades: [{}],
      image:"string",
      branchId: "5defe517dcf0af574296a00e",
      createdById: localStorage.getItem("userId"),
      color: "string",
      inCalculator: "string",
      icon: "string",
    }
    this.loading = true;
    this.serviceService.createIndividualProduct(values)
    .then((data) => {
      alert("Product created")
      this.modalService.dismissAll();
      location.reload();
    })
    .catch((error) => {
      this.loading = false
      console.log(localStorage.getItem("token"));
      console.log("Promise rejected with ");
    });
  }
  
  logout(){
    this.loading = true;
    this.serviceService.logoutUser()
    .then((data) => {
      this.loading = false;
      localStorage.clear()
      this.routerService.navigate(['/login'])
    })
    .catch((error) => {
      this.loading = false;
      console.log(localStorage.getItem("token"));
      console.log("Promise rejected with ");
    });
  }
}
