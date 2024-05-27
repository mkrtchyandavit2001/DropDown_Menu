class FilterDropdown extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.init();
    }

    init() {
        let items = this.getAttribute("items").split(" ");
        if (!items.length || items[0] === "") {
            console.error("Please add names");
            items = [];
        }
        this.items = items;
        this.render();
        this.loadCSS();
    }

    render() {
        let container = document.createElement("div");
        let dropdownBtn = document.createElement("button");
        let search = document.createElement("input");

        container.classList.add("dropdown");
        dropdownBtn.classList.add('dropdown-button');
        search.classList.add("search");

        dropdownBtn.innerText = "Dropdown";
        search.setAttribute("id", "searchID");
        search.setAttribute("placeholder", "Search...");

        this.root.append(dropdownBtn);
        this.root.append(container);
        container.append(search);

        dropdownBtn.addEventListener('click', () => {
            container.style.display = "block"
        });

        search.addEventListener('input', () => {
            this.filterItems(search.value);
        });

        for (let i = 0; i < this.items.length; i++) {
            let name = document.createElement("div");
            name.classList.add("name");
            name.innerText = this.items[i];
            container.append(name);
        }
    }

    filterItems(query) {
        const names = this.root.querySelectorAll('.name');
        names.forEach(name => {
            if (name.innerText.toLowerCase().includes(query.toLowerCase())) {
                name.style.display = '';
            } else {
                name.style.display = 'none';
            }
        });
    }

    loadCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .dropdown-button {
                width: 140px;
                height: 50px;
                color: white;
                font-size: 25px;
                background: #04AA6D;
                margin-left: 40px;
                margin-top: 20px;
                cursor: pointer;
            }
            .dropdown {
                display: none;
                // display: block;
                width: 300px;
                min-height: 70px;
                border: 1px solid black;
                margin-left: 40px;
                margin-top: 10px;
                padding: 10px;
                background: white;
                box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
            }
            .dropdown .search {
                width: 100%;
                height: 30px;
                margin-bottom: 10px;
                padding: 5px;
                font-size: 16px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
            .name {
                padding: 15px 10px;
                font-size: 20px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
            }
            .name:hover {
                background: #f0f0f0;
            }
        `;
        this.root.appendChild(style);
    }
}

// Define the custom element
customElements.define("filter-dropdown", FilterDropdown);
