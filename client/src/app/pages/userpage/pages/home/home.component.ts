import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public posts: any[] = [
    {
      name: 'Dani',
      location: 'Abudabi',
      imageProfileUrl:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      photo:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Daniel',
      location: 'Arges',
      imageProfileUrl:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      photo:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      name: 'Zed',
      location: 'Insula umbrelor',
      imageProfileUrl:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      photo:
        'https://images.unsplash.com/photo-1660463529885-581a0d057c76?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
  ];
  constructor() {}
}
