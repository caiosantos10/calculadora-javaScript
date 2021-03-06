 class CalcController{
    /*querySelector method - select elements in document html */ 
    constructor(){
        //operation armazena os numeros e sinais da operacao a ser realizada
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); 
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){

        this.setDisplayDateTime()

        setInterval(()=>{

            this.setDisplayDateTime()

        }, 1000);

        this.setLastNumberToDisplay();
        
    }
    /*Um EventListener customizado que recebe varios eventos,
    estes eventos são adicionados para cada (forEach) botão/element*/ 
    addEventListenerAll(element, events, fn){

        events.split(' ').forEach(event =>{

            element.addEventListener(event, fn, false);

        });
    
    }

    //AC
    clearAll(){

        this._operation = [];

        this.setLastNumberToDisplay();
        
    }

    //CE
    clearEntry(){

        this._operation.pop();
        
        this.setLastNumberToDisplay();
    }

    //retorna o ultimo item do array _operation
    getLastOperation(){

        return this._operation[this._operation.length-1];
    }

    //substitui ultima ultima posicao pelo argumento 'value' 
    setLastOperation(value){

        this._operation[this._operation.length-1] = value;

    }

    isOperator(value){

       return (['+','-','*','/','.','%'].indexOf(value) > -1);

    }

    pushOperation(value){

        this._operation.push(value);

        if (this._operation.length > 3){

            this.calc();

        }
    }
    
    //efetua calculo com pares de numeros
    calc(){

        let last = '';

        if (this._operation.length > 3){
            
            last = this._operation.pop();
            
        }
        
        let result = eval(this._operation.join("")); 

        //fazer validação do simbolo de %
        if (last == '%'){

            result = result / 100;

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);
        }


        this.setLastNumberToDisplay();

    }

    setLastNumberToDisplay(){

        let lastNumber;

        for(let i = this._operation.length - 1; i >= 0; i--){

            if(!this.isOperator(this._operation[i])){

                lastNumber = this._operation[i];
                break;

            }
        }

        if (!lastNumber){
            lastNumber = 0;
        }    

        this.displayCalc = lastNumber;

    }

    addOperator(value){
        
        //console.log('a', value, isNaN(this.getLastOperation()));

        //se ultimo item o array NAO é numero
        if (isNaN(this.getLastOperation())){ 
            //se value (item atual) é operador
            if (this.isOperator(value)){
                
                this.setLastOperation(value);

            //se value (item atual) NAO é numero    
            } else if(isNaN(value)){
                
                console.log('outra coisa',value);

            // caso contrario (se for numero)    
            } else {

                this.pushOperation(value);

                this.setLastNumberToDisplay();

            }

            //CASO UM OPERADOR SEJA DIGITADO APOS UM NUMERO
        } else {
            if (this.isOperator(value)){

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

                this.setLastNumberToDisplay();

            }

        }
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){

        switch (value){

            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperator('+');
                break;
            case 'subtracao':
                this.addOperator('-');
                break;
            case 'divisao':
                this.addOperator('/');
                break;
            case 'multiplicacao':
                this.addOperator('*');
                break;
            case 'porcento':
                this.addOperator('%');
                break;           
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addOperator('.');
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperator(parseInt(value));
                break;

            default: 
                this.setError();
                break;   
            
            

        }

    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g")

        buttons.forEach((btn, index)=>{

            this.addEventListenerAll(btn,"click drag", e => {

                let textBtn = btn.className.baseVal.replace("btn-","");  
                
                this.execBtn(textBtn);
                
                

            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{

                btn.style.cursor = "pointer";

            });

        });

    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    
    }

    get displayDate(){
        return this._dateEl.innerHTML;   
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;   
    }
    
    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;   
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }
    
    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}