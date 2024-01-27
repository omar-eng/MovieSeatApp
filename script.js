const container=document.querySelector('.container');
const seats=document.querySelectorAll('.row .seat:not(.occupied)');
// console.log(seats);
const count=document.getElementById('count');
const total=document.getElementById('total');

const movieselect=document.getElementById('movie');

populateui();


let ticketprice=+movieselect.value;


//save selected movie and price
function setmoviedata(index,price)
{
    localStorage.setItem('movieindex',index);
    localStorage.setItem('movies-price',price);
}






// console.log(ticketprice);
// console.log(typeof ticketprice);

function updateselectedcount()
{
    const selectedseats=document.querySelectorAll('.row .seat.selected');


//copy selectedseats into an array
// map through the array
//return a new array indexes

    const selectedindexes=[...selectedseats].map((index)=>{
        return [...seats].indexOf(index);
        
    });
// console.log(selectedindexes);

localStorage.setItem('selectedseats', JSON.stringify(selectedindexes));
    const selectedseatscount=selectedseats.length;
    // console.log(selectedseatscount);
    count.innerText=selectedseatscount;
    total.innerText=selectedseatscount*ticketprice;
}

function populateui(){
    const selectedseats=JSON.parse(localStorage.getItem('selectedseats'));
    if(selectedseats !==null && selectedseats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedseats.indexOf(index)>-1)
            {
                seat.classList.add('selected');
            }
        });
    }

    const movieindex=localStorage.getItem('movieindex');
    if(movieindex!==null)
    {
        movieselect.selectedIndex=movieindex;
    }
}


//movie select event

movieselect.addEventListener('change',(e)=>{
    ticketprice=+e.target.value;
    // console.log(e);
    setmoviedata(e.target.selectedIndex,e.target.value);
    updateselectedcount();
});

//seats click event
container.addEventListener('click',(e)=>{


        if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
        {
            // console.log(e.target);
            e.target.classList.toggle('selected');
            updateselectedcount();
        }
        
});

//intial count

updateselectedcount();
