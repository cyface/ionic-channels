import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Subscription} from 'rxjs/Subscription';
import {RemoteServiceProvider} from '../../providers/remote-service/remote-service';
import {ServerSocket} from '../../providers/serversocket-service/serversocket-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  postList;
  intVal = 0;
  private socketSubscription: Subscription;

  constructor(public navCtrl: NavController, private remoteService: RemoteServiceProvider, private serverSocket: ServerSocket) {
    //this.getPosts();
    this.getInteger();
  }

  getPosts() {
    console.log("Hello getPosts");
    this.remoteService.getPosts().subscribe((data) => {
      this.postList = data;
      console.log(data);
      return this.postList;
    });
  }

  getInteger() {
    console.log("Hello getInteger");
    this.serverSocket.connect()

    this.socketSubscription = this.serverSocket.messages.subscribe((message: string) => {
      console.log('received message from server: ', message);
      let response = JSON.parse(message);
      console.log(response);
      this.intVal = response.payload.data.value;
    });

    this.serverSocket.send(JSON.stringify({'stream': 'intval_get', 'payload': {'pk': 1}}));
  }

  updateInteger() {
        console.log("Update Integer Was Clicked")
        this.serverSocket.send(JSON.stringify({'stream': 'intval', 'payload': {'action': 'update', 'pk': 1, 'data': {'value': this.intVal + 1}}}));
    }

}
