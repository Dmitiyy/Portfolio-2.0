import AOS, {AosOptions} from 'aos';
import '../sass/index.sass';

const AOSConfig: AosOptions = {
  disable: false
}

AOS.init(AOSConfig);

if (document.querySelector('.projects')) { 
  type TProject = {
    img: string;
    link: string;
    name: string;
    id: number;
  }
  
  let projectsActive: number = 0;
  let projectsData: Array<TProject>;
  let loading: Boolean = false;

  const setLoading = (value: Boolean): void => {
    loading = value;
    const element = document.querySelector<HTMLDivElement>('.projects__loading');

    if (loading === true) {element.style.display = 'flex'}
    else {element.style.display = 'none'};
  };

  const setSelectedProject = (name: string, link: string, img: string): void => {
    const liCollection = document.querySelectorAll('.projects__wrap-categories li');

    document.querySelector('.projects h2').textContent = name;
    document.querySelector('.projects__btns a').setAttribute('href', link);

    liCollection.forEach(item => {
      item.classList.remove('projects__nav-active');
    });
    liCollection[projectsActive].classList.add('projects__nav-active');

    document.querySelector('.projects__wrap img').setAttribute('src', img);
  }
  
  const getAllProjects = async (url: string): Promise<{
    status: string; data: Array<TProject>
  }> => {
    const response = await fetch(url);
    return await response.json();
  }
  setLoading(true);
  getAllProjects('/api/getAllProjects')
    .then((result) => {
      projectsData = result.data;
  
      for (let index: number = 0; index < projectsData.length; index++) {
        const element: TProject = projectsData[index];
        const li: HTMLLIElement = document.createElement('li');
        li.textContent = element.name;
        document.querySelector('.projects__wrap-categories').append(li);

        li.addEventListener('click', () => {
          projectsActive = element.id;
          setSelectedProject(element.name, element.link, element.img);
        });
      }

      document.querySelector('.projects__btns div').addEventListener('click', () => {
        projectsActive++;
        if (projectsActive === 4) {projectsActive = 0};

        setSelectedProject(
          projectsData[projectsActive].name, result.data[projectsActive].link, 
          result.data[projectsActive].img
        );
      });

      setSelectedProject(
        projectsData[projectsActive].name, result.data[projectsActive].link, 
        projectsData[projectsActive].img
      );
      
      const element = document.querySelector<HTMLDivElement>('.projects');
      element.classList.remove('aos-init');
      element.classList.remove('aos-animate');

      setTimeout(() => {
        setLoading(false)
        element.style.display = 'block';
        AOS.init();
      }, 1000);
    });
}

if (document.querySelector('.contacts__form')) {
  interface IData {
    name: string;
    email: string;
    message: string;
  }

  const name: HTMLInputElement = document.querySelector('#name');
  const email: HTMLInputElement = document.querySelector('#email');
  const message: HTMLTextAreaElement = document.querySelector('#message');
  
  const sendMessage = async (url: string, data: IData) => {
    const response: Response = await fetch(url, {
      method: 'POST', 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(data)
    });
    return await response.text();
  };
  
  document.querySelector('.contacts__form button').addEventListener('click', (e) => {
    e.preventDefault();

    const inputCondition = (element: HTMLInputElement | HTMLTextAreaElement): void => {
      if (element.value.length === 0) {
        element.style.border = '2px solid #8f362e';
      } else {
        element.style.border = 'none';
      }
    }

    inputCondition(name);
    inputCondition(email);
    inputCondition(message);

    if (name.value.length !== 0 && email.value.length !== 0 && message.value.length !== 0) {
      const data: IData = {name: name.value, email: email.value, message: message.value};
  
      sendMessage('/api/sendMessage', data).then(result => {
        name.value = '';
        email.value = '';
        message.value = '';

        const success = document.querySelector<HTMLParagraphElement>('.form-successful');
        success.style.display = 'inline-block';
        setTimeout(() => {success.style.display = 'none'}, 3000);
      });
    }
  });
}