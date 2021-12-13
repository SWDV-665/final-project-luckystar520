import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HistoriesService } from './histories.service';


@Injectable({
  providedIn: 'root'
})
export class InputDialogueService {

  constructor(public alertCtrl: AlertController, public dataService: HistoriesService) { }

  async showEditPrompt(item) {
    var itemid = item._id;
    const alert = await this.alertCtrl.create({
      header: 'Edit Paste ',
      message:'Please edit paste...',
      inputs: [
        {
          name: 'content',
          type: 'text',
          placeholder: 'Content',
          value: item.content
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'SAVE',
          handler: (item) => {
            item._id = itemid;
            console.log('Saved', item);
            this.dataService.editItem(item); 
          }
        }
      ]
    });

    await alert.present();
  }
}
