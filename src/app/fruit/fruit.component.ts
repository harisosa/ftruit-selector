import { Component, OnInit } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { FruitService } from '../services/fruit.service';
import { User } from '../_model/user';
declare var window: any;

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrls: ['./fruit.component.scss']
})
export class FruitComponent implements OnInit {
  modal: any;
  currentUser? : User;
  username : string ;
  modalForm : string = "";
  fruits = []

  fav : string[] = []
  constructor(
    private authService : AuthService,
    private fruitService : FruitService,
    private alerService : AlertService
  ) { 

    this.authService.currentUser.subscribe(
      (res : any) => {
        
        if (typeof res == "object" && res != null){
          if (Object.keys(res).length > 0){
            this.currentUser = res
          }
        }
      });


      this.username= this.currentUser?.username || ""
  }

  ngOnInit(): void {
    this.modal = new window.bootstrap.Modal(
      document.getElementById('selectModal')
    );

    this.getFruits()
    this.getFav()
  }

  saveFav(favFruits : string[]){
    

    this.fruitService.remove(this.username).subscribe(x=> {

      let strFav = JSON.stringify(favFruits)
      this.fruitService.add(this.username,strFav).subscribe()

      this.alerService.success("Sucess Add Your Favorite Fruit")
      this.getFav()
      this.closeModal()
    })

  }

  add(){
    let fruit = this.modalForm;
    let idx = this.fav.indexOf(fruit)
    if (idx == -1){
      this.fav.push(fruit)
    }
    
    this.saveFav(this.fav)
  }
  
  remove(fruit : string){
    let idx = this.fav.indexOf(fruit)
    if (idx > -1){
      this.fav.splice(idx, 1); 
    }

    this.saveFav(this.fav)
  }
  openModal() {
    this.fruits = this.fruits.filter(item => !this.fav.includes(item));
    this.modal.show();
  }
  closeModal(){
    this.modal.hide()
  }

  getFruits(){
    this.fruitService.GettAllFruit().subscribe(res => 
      {
        if (res){
          let data =res
          this.fruits = data.fruits;
          this.fruits.sort()
        }
      })
  }

  getFav(){
    
    this.fruitService.getFavoriteFruit(this.username).subscribe((fav : string)=> {
      if (fav){
        this.fav=JSON.parse(fav)
        this.fav.sort()
      }
    })

  }

}
