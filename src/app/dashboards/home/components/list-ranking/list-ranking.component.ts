import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-ranking',
  templateUrl: './list-ranking.component.html',
  styleUrls: ['./list-ranking.component.scss']
})
export class ListRankingComponent implements OnInit {

  carouselResponsiveOptions: any[] = [
    {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
    },
    {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
    },
    {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
    }
];

customerCarousel: any[]=[];

ngOnInit(): void {
  this.customerCarousel = [
    {user: '98,673 Users', value: '$7,653,311', image: 'mc'},
    {user: '9,673 Users', value: '$8,362,478', image: 'nasa'},
    {user: '9,395 Users', value: '$7,927,105', image: 'beats'},
    {user: '7,813 Users', value: '$6,471,594', image: 'gopro'},
    {user: '7,613 Users', value: '$5,697,883', image: 'north'},
    {user: '5,645 Users', value: '$4,567,823', image: 'dell'},
    {user: '5,153 Users', value: '$5,342,678', image: 'wwf'},
    {user: '4,338 Users', value: '$5,867,391', image: 'bmw'},
    {user: '4,170 Users', value: '$4,647,233', image: 'pepsi'},
    {user: '3,765 Users', value: '$4,123,876', image: 'netflix'},
    {user: '3,490 Users', value: '$3,688,362', image: 'deloitte'},
    {user: '2,976 Users', value: '$3,978,478', image: 'pg'},
];
}

}
