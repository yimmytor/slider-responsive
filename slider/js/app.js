(function () { 
    let sliderContainer = document.querySelector('#slider-container');
    let right;
    let currentChild;
    let childrenCount;

    function InitSlider()
    {
        right = 0
        currentChild=0;
        childrenCount=0;

        GenerateChildren();       
        
        document.querySelector('#slider-arrow-container').addEventListener('click', ValidateClick);
        document.querySelector('#slider-arrow-left').addEventListener('click', LeftArrow);
        document.querySelector('#slider-arrow-right').addEventListener('click', RightArrow);
        window.addEventListener("resize", Resize);
    }

    function GenerateChildren()
    {
        let sliderChildren = [...document.querySelectorAll('#slider-container img.slider-img')];
        let filteredChildren = [];
    
        sliderChildren = sliderChildren.filter(child => child.tagName == 'IMG' 
                                                     && child.classList.contains('slider-img'))
        
        sliderChildren.forEach(child => {
            let newChild;        
             
            if (child.parentNode.tagName == 'A' && child.parentNode.classList.contains('slider-anchor')){
                newChild = document.createElement("a");     
                newChild.href = child.parentNode.href;                           
                newChild.style.backgroundImage = "url(" + child.src + ")";
                newChild.classList.add('slider-img');

                filteredChildren.push(newChild);
            }
            else if (child.parentNode.tagName == 'DIV' && child.parentNode.classList.contains('slider-container'))
            {
                newChild = document.createElement("div");
                newChild.style.backgroundImage = "url(" + child.src + ")";
                newChild.classList.add('slider-img');  
                
                filteredChildren.push(newChild);
            }
        });
             
        while (sliderContainer.firstChild)
        {
            sliderContainer.removeChild(sliderContainer.firstChild);
        }

        filteredChildren.forEach(children => {            
            sliderContainer.appendChild(children);
        });

        childrenCount = filteredChildren.length;

        if (childrenCount > 0)
        {
            currentChild=1;
            ShowCurrentChild(1)
        }
    } 

    function LeftArrow()
    {
        let width = sliderContainer.getBoundingClientRect().width
        
        if (childrenCount > 1)
        {    
            currentChild--;

            if (right >= 0)
            {
                right = (width * (childrenCount)) * -1;
                currentChild=childrenCount;
                sliderContainer.style.transform = "translateX(" + right + "px)  translateY(-100%)";
            }

            right = right + width;
            sliderContainer.style.transform = "translateX(" + right + "px) translateY(-100%)";

            ShowCurrentChild(currentChild);
        }
    }

    function RightArrow()
    {
        let width = sliderContainer.getBoundingClientRect().width
        
        if (childrenCount > 1)
        {
            currentChild++;

            right = right - width;
            sliderContainer.style.transform = "translateX(" + right + "px) translateY(-100%)"
            
            if (right + width * childrenCount <= 0)
            {
                right = 0;
                currentChild=1;
                sliderContainer.style.transform = "translateX(" + right + "px)  translateY(-100%)";
            }

            ShowCurrentChild(currentChild);
        }        
    }

    function ShowCurrentChild(childNumber)
    {
        let sliderArrowContainer = document.querySelector('#slider-arrow-container');
        let child = sliderContainer.childNodes[childNumber - 1];

        sliderArrowContainer.href="";
        sliderArrowContainer.classList.remove("cursor-pointer");

        if (child != undefined)
        {        
            if (child.tagName == "A")
            {
                sliderArrowContainer.href = child.href;  
                sliderArrowContainer.classList.add("cursor-pointer");
            }
        }
    }

    function ValidateClick(e)
    {
        if(e.target.tagName != "A")
        {
            e.preventDefault();
        }
        else
        {
            if (sliderContainer.childNodes[currentChild - 1].tagName != "A")
            {
                e.preventDefault();
            }
        }
    }

    function Resize()
    {
        right=0;
        currentChild=1;
        sliderContainer.style.transform = "translateX(" + right + "px)  translateY(-100%)";
    }

    InitSlider();
})(); 