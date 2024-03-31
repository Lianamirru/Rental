const advantages = [
  {
    title: "Wide Selection of Instruments",
    body: "Choose from a diverse range of high-quality instruments to suit your musical needs and preferences.",
  },
  {
    title: "Flexible Rental Plans",
    body: "We offer flexible rental plans tailored to your schedule, whether you need an instrument for a weekend gig or an extended rehearsal period.",
  },
  {
    title: "Excellent Customer Service",
    body: "Our experienced team is dedicated to providing exceptional customer service, assisting you with instrument selection, setup, and any questions or concerns you may have.",
  },
];

const ListItem = ({ item }: ListItemProps) => {
  return (
    <li>
      <h3 className="numbered-items__title">{item.title}</h3>
      <p className="numbered-items__body" data-width="wide">
        {item.body}
      </p>
    </li>
  );
};

const About = () => {
  return (
    <section id="about-section">
      <div className="even-columns">
        <div className="about">
          <h2>What’s different about Hit Factory?</h2>
          <p>
            HIT FACTORY offers a wide selection of high-quality instruments,
            flexible rental plans tailored to your needs, and exceptional
            customer service from our experienced team.
          </p>
        </div>
        <ul className="numbered-items" role="list">
          {advantages.map((adv, index) => (
            <ListItem item={adv} key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

type ListItemProps = {
  item: { title: string; body: string };
};

export default About;
