import '../sass/index.sass';

if (document.querySelector('.projects')) { 
  type TProject = {
    img: string;
    link: string;
    name: string;
    id: number;
  }
  
  let projectsActive: number = 0;
  let projectsData: Array<TProject>;

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
    });
}