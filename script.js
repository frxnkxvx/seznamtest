let shoppingList = []; // Vytváří prázdné pole 'shoppingList', které bude obsahovat seznam nákupních položek

function addItem() {
    const itemName = document.getElementById("itemName").value;  // Získá hodnotu z pole pro zadání názvu položky
    const itemQuantity = document.getElementById("itemQuantity").value; // Získá hodnotu z pole pro zadání množství položky
    const itemCategory = document.getElementById("itemCategory").value; // Získá hodnotu z pole pro zadání kategorie

    if (itemName && itemQuantity > 0) { // Ověří, jestli jsou obě hodnoty vyplněné a množství je větší než 0
        const newItem = {  // Vytváří nový objekt pro položku
            name: itemName,
            quantity: itemQuantity,
            category: itemCategory
        };

        shoppingList.push(newItem); // Přidá nový objekt (položku) do pole 'shoppingList'
        updateShoppingList(); // Aktualizuje seznam

        // Vyprázdnění polí
        document.getElementById("itemName").value = '';  
        document.getElementById("itemQuantity").value = '';  
        document.getElementById("itemCategory").value = '';
    } else {
        alert("Zadejte platné údaje pro název a množství."); // Upozornění při chybném vstupu
    }

    showStatusMessage("Položka byla přidána úspěšně!");  
}

function updateShoppingList() {
    const listElement = document.getElementById("shoppingList");  
    listElement.innerHTML = ""; 

    const categories = [...new Set(shoppingList.map(item => item.category))]; // Najde unikátní kategorie
    
    categories.forEach(category => {
        const categoryHeader = document.createElement("h3");
        categoryHeader.textContent = category.charAt(0).toUpperCase() + category.slice(1);  
        listElement.appendChild(categoryHeader);  
    
        shoppingList.filter(item => item.category === category).forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} (x${item.quantity})`;

            // !!!!! TLAČÍTKO PRO ODEBRÁNÍ POLOŽKY !!!!! 
            const removeButton = document.createElement("button");
            removeButton.textContent = "Odebrat";
            removeButton.className = "remove-btn";

            removeButton.addEventListener("click", () => {
                removeItem(index); // !!!!! FUNKCE PRO ODEBRÁNÍ !!!!! 
            });

            listItem.appendChild(removeButton); // !!!!! PŘIDÁNÍ TLAČÍTKA DO POLOŽKY !!!!! 
            listElement.appendChild(listItem);
        });
    });
}

function removeItem(index) {
    shoppingList.splice(index, 1); // Odstraní položku z pole 'shoppingList' podle indexu
    updateShoppingList(); // Aktualizuje seznam
    showStatusMessage("Položka byla odebrána"); // Zpráva o úspěšném odebrání
}

function exportToTXT() {
    let content = "SEZNAM NÁKUPU:\n";  
    const categories = [...new Set(shoppingList.map(item => item.category))];  

    categories.forEach(category => {
        content += `\nKategorie: ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;  
        shoppingList.filter(item => item.category === category).forEach(item => {
            content += `${item.name} (x${item.quantity})\n`;  
        });
    });

    const blob = new Blob([content], { type: "text/plain" });  
    const link = document.createElement("a");  
    link.href = URL.createObjectURL(blob); 
    link.download = "seznam_nakupu.txt"; 
    link.click(); 
    showStatusMessage("Seznam byl úspěšně stažen!");  
}

function showStatusMessage(message, isError = false) {
    const statusElement = document.getElementById("statusMessage");
    statusElement.textContent = message; 
    statusElement.style.color = isError ? "red" : "green"; 

    setTimeout(() => {
        statusElement.textContent = '';
    }, 3000);
}
