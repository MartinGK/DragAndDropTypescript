namespace App {

    //ProjectInput Class
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super('project-input', 'app', true, 'user-input')

            this.titleInputElement = <HTMLInputElement>this.element.querySelector('#title');
            this.descriptionInputElement = <HTMLInputElement>this.element.querySelector('#description');
            this.peopleInputElement = <HTMLInputElement>this.element.querySelector('#people');

            this.configure();
            this.renderContent();
        }

        configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }

        renderContent() {
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validatable = {
                value: enteredTitle,
                required: true
            }
            const descriptionValidatable: Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            }
            const peopleValidatable: Validatable = {
                value: enteredPeople,
                required: true,
                min: 1,
                max: 5
            }

            if (
                !validate(titleValidatable) ||
                !validate(descriptionValidatable) ||
                !validate(peopleValidatable)
            ) {
                alert('invalid Input');
                return;
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople]
            }
        }

        private clearInput(): [string, string, number] | void {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }


        @autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, description, people] = userInput;
                projectState.addProject(title, description, people);
                this.clearInput();
            }
        }

    }
}