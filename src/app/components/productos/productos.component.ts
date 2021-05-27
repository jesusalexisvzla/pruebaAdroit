import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ServiceService } from '../../servicios/servicio.service'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public productsFrom = this.fb.group({
    name: new FormControl({value: '', disabled: false}, Validators.required),
    id: new FormControl({value: '', disabled: false}, Validators.required)
  });

  constructor( private fb: FormBuilder, private serviceService: ServiceService, private _builder: FormBuilder, private modalService: NgbModal, private routerService: Router) { 
    this.formProduct = this._builder.group({
      name: ['', Validators.required],
      contractName: [''],
      grades: [{}],
      image:'',
      branchId: ['', Validators.required],
      createdById: ['', Validators.required],
      color: [''],
      inCalculator: false,
      icon: [''],
      id : ['',],
      branch:[{}]
    })
  }
  formProduct:FormGroup;
  formProducto:FormGroup;


  public products: any;
  public dataSource: any;
  public product: any;
  displayedColumns: string[] = ['name', 'contractName', 'branch'];
  editar = false;
  closeResult = '';
  public loading = false;


  ngOnInit(): void {
    this.loading = true;
    this.serviceService.getProductsMexico("?filter=" + JSON.stringify({include:"branch"}) + "&")
    .then((data) => {
      console.log(data);
      this.loading = false;
      this.products = data;
      this.dataSource = this.products;
      console.log(this.dataSource);
      })
    .catch((error) => {
      this.loading = false;
      this.logout();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  seleccionarProducto(id, content){
    this.serviceService.getProductsMexico(id + "?")
    .then((data) => {
      this.product = data;
      console.log(data);
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  .catch((error) => {
      console.log("Promise rejected with ");
    });
  }
  
  comprobarEdicion(values){
    if (this.editar=true) {
      if (this.formProduct.value.name == '') {
        this.formProduct.value.name = this.product.name
      }
      if (this.formProduct.value.descripcion == '') {
        this.formProduct.value.descripcion = this.product.contractName
      }
      values = {
        id: this.product.id,
        name: this.formProduct.value.name,
        contractName: this.formProduct.value.contractName,
      };
      this.editarProducto(this.product.id, values)
    }
  }

  editarProducto(id, values){
    this.loading = true;
    this.serviceService.patchIndividualProduct(id, values)
    .then((data) => {
      alert("Product updated")
      this.modalService.dismissAll();
      location.reload();
    })
    .catch((error) => {
      this.loading = false;
      alert("Product not updated")
      console.log(localStorage.getItem("token"));
      console.log("Promise rejected with ");
    });
  }

  eliminarProducto(id){
    this.serviceService.deleteIndividualProduct(id)
    .then((data) => {
      alert("Product deleted")
      this.modalService.dismissAll();
      location.reload();
    })
    .catch((error) => {
      console.log(localStorage.getItem("token"));
      console.log("Promise rejected with ");
    });
  }

  logout(){
    this.loading = true;
    localStorage.clear()
    this.routerService.navigate(['/login'])
  }
}
