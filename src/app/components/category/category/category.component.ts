import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../services/category/category.service";
import {Category} from "../../../models/category";
import {ElementService} from "../../../services/element/element.service";
import {MatDialog} from "@angular/material/dialog";
import {AddFriendComponent} from "./modal/add-friend/add-friend.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  public category: Category | undefined;
  elementsModel: any = {};

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private elementService: ElementService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(e => {
      console.log(e);
      this.categoryService.getCategoryById(e.get('code')).subscribe(ctg => {
        this.category = ctg;
        ctg.elements.forEach(e => {
          this.elementsModel[e.code] = e.checked;
        })
      })
    })
  }

  check(code: string, state: boolean) {
    console.log(code + " * " + state)
    this.elementService.check(code, state).subscribe(e => {
      if (e.message != "success") {
        console.log("error");
      }
    });

  }

  getBackToIndex() {
    this.router.navigateByUrl('/');
  }

  showAddFriendDialog() {
    const dialogRef = this.dialog.open(AddFriendComponent, {
      width: '60vw',
      height: '60vh',
      data:this.category
    });

    dialogRef.afterClosed().subscribe(result => {
      //nothing atm
    });
  }
}
