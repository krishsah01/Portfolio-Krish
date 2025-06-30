import {forwardRef} from 'react';

interface SkillsProps {
  // Any props the Skills component needs
}

const skills = [
    { name: 'JavaScript', color: 'bg-yellow-400' },
    { name: 'TypeScript', color: 'bg-blue-500' },
    { name: 'React', color: 'bg-cyan-400' },
    { name: 'Node.js', color: 'bg-green-500' },
    { name: 'Python', color: 'bg-blue-300' },
    { name: 'MySQL', color: 'bg-orange-400' },
    { name: 'Tailwind CSS', color: 'bg-teal-400' },
    { name: 'Git', color: 'bg-red-500' },
];

const Skills = forwardRef<HTMLElement, SkillsProps>((_props, ref) => {
    return (
        <section ref={ref} className="py-10"
            id="skills">
            <h2 className="text-3xl font-bold text-center mb-6">Skills</h2>
            <div className="flex flex-wrap justify-center">
                {skills.map((skill) => (
                    <div key={skill.name} className={`m-2 p-4 rounded-lg text-white ${skill.color}`}>
                        {skill.name}
                    </div>
                ))}
            </div>
        </section>
    );
});

export default Skills;