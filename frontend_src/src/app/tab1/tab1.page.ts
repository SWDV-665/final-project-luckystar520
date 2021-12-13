import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HistoriesService } from '../histories.service';
import { InputDialogueService } from '../input-dialogue.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  items = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: HistoriesService, public inputDialogueService: InputDialogueService, public socialSharing: SocialSharing) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      console.log("data changed. reload");
      this.loadItems();
    });
  
    this.loadItems();
  }

  loadItems() {
    console.log("Load items into page");

    this.dataService.getItems().subscribe(
      items => {
        this.items = items;
        console.log("loaded items");
        console.log(this.items);
        console.log(this);
      },
      error => this.errorMessage = <any> error
    );
  }

  pasteInput = "";
  
  async editItem(item) {
    console.log('Edit item - ', item);
    let toast = await this.toastCtrl.create({
      message: 'Edit item - ' + item._id + " - " + item.content,
      duration: 3000,
      position: 'bottom'
    });
    
    toast.present();

    this.inputDialogueService.showEditPrompt(item);
  }  

  async deleteItem(item) {
    console.log('Delete item - ', item);
    
    let toast = await this.toastCtrl.create({
      message: 'Delete item - ' + item._id + " - " + item.content,
      duration: 3000,
      position: 'bottom'
    });
    
    toast.present();

    this.dataService.deleteItem(item);
  }

  async addItem() {
    console.log('Adding item - ', this.pasteInput);
    let toast = await this.toastCtrl.create({
      message: 'Add item - ' + this.pasteInput,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();

    this.dataService.addItem(this.pasteInput);
  }

  async shareItem(item) {
    console.log('Share item - ' + JSON.stringify(item));
    
    let test = ""
    let message = "Paste Item - Name: " + item.content;
    let subject = "Shared via Paste Board App";
    await this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      console.log("Shared successfully!");
      test = "Can share";

      this.socialSharing.shareViaEmail(message, subject, ['yanlingtest1@gmail.com']).then(() => {
        test = "Shared with email";
      })
      
    }).catch((error) => {
      // Sharing via email is not possible
      console.log("Error while sharing ", error);
      test = error;
    });

    let toast = await this.toastCtrl.create({
      message: 'Share item - ' + item._id + " - " + item.content,
      duration: 3000,
      position: 'bottom'
    });
    
    toast.present();
    
  } 

}
