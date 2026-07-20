export interface BlogMagna {
    count:    number;
    next:     string ;
    previous: string 
    results:  Result[];
}

export interface Result {
    id:          number;
    title:       string;
    description: string;
    content:     string;
    date_posted: Date;
    author:      Author;
    category:    Category;
    comments:    Comment[];
    image:       string;
    important:   boolean;
}
export interface BlogimportantMagna {
    id:          number;
    title:       string;
    date_posted: Date;
    author:      Author;
    category:    Category;
    important:   boolean;
    image:       string;
}

export interface Author {
    id:         number;
    email:      string;
    first_name: string;
    last_name:  string;
    is_active:  boolean;
    is_staff:   boolean;
    is_editor:  boolean;
}

export interface Category {
    id:   number;
    name: string;
    image: string;
}

export interface Comment {
    id:           number;
    author:       Author;
    text:         string;
    created_date: Date;
    post:         number;
}