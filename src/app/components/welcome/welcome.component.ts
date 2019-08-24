import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { VisitorService } from '@services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private visitorService: VisitorService
  ) {
    this.loginForm = this.fb.group({
      name: [null, [Validators.required, this.noWhitespaceValidator]]
    });
  }

  ngOnInit() { }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAsDirty();
      return;
    }
    const name = this.loginForm.value.name;
    this.visitorService.setName(name.trim());
  }

  /**
   * Validate that there are no white spaces.
   */
  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
}
