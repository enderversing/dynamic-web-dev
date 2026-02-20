window.onload = () => {
            messageRequest();
   };

const messageRequest = async () => {
            const response = await fetch("/all-books");
            console.log(response);
            const json = await response.json();
            let array = json;
            console.log(array);

            let begin = "You should read ";
            let between = " and ";
            console.log(array);
            let middle = array.join(between);
            console.log(middle);
            let string = begin + middle + ".";
            document.body.innerText = string;
  };
