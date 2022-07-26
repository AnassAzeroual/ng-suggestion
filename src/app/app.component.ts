import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'suggestions';
  input = new FormControl('',[Validators.required]);
  suggestion = '';
  names = [
    'salut ça va ?',
    'salut ça va vous allez bien ?',
    'Je m\'appelle anas et j\'ai 30 ans',
    'Mike',
    'Jane',
    'Hanna',
    'Pedro',
    'Alfred'
  ];
  constructor() { }

  ngOnInit() {
    this.input.valueChanges.subscribe((res) => {
      this.autoCompleteHundler(res ?? "");
    })
  }

  private autoCompleteHundler(res: string) {
    if (res?.length) {
      let position = 0
      let temp = []
      for (let i = 0; i < this.names.length; i++) {
        let name = this.names[i];
        if (name?.toLowerCase().startsWith(res?.toLowerCase())) {
          position = (res.split(' ').length)
          temp = name.split(' ')
          this.suggestion =  temp.splice(0,position).join(' ')
          break
        }
      }
    } else {
      this.suggestion = "";
    }
  }

  enter() {
    if(!this.suggestion) return // is empty suggestion 
    this.input.setValue(`${this.suggestion} `)
  }
}
