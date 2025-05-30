import {useState} from "react";
import {
	TextInput,
	Title,
	Text,
	Container,
	Button,
	Group,
	Stack,
	Card,
	ThemeIcon,
	Center,
	Box,
	Flex,
} from "@mantine/core";
import {Key, Sparkles, Share2, GitBranch, BookOpenText, Coins, Lightbulb} from "lucide-react";
import {motion} from "framer-motion";

export default function LandingPage() {
	const [email, setEmail] = useState("");

	const features = [
		{
			icon: Sparkles,
			title: "C4 Model Based",
			desc: "Support for Context, Container, and Component views."
		},
		{
			icon: GitBranch,
			title: "Link to Code",
			desc: "Connect nodes to GitHub, docs, or any external resource."
		},
		{
			icon: Share2,
			title: "User Journeys",
			desc: "Step through flows interactively to onboard or demo."
		},
		{
			icon: BookOpenText,
			title: "Component Library",
			desc: "Drag & drop systems, APIs, DBs, services, and more."
		},
	];

	const useCases = [
		{
			title: "Architecture Design",
			desc: "Quickly map out systems, flows, and dependencies for your new project."
		},
		{
			title: "Team Onboarding",
			desc: "Create interactive walkthroughs for faster developer onboarding."
		},
		{
			title: "Documentation",
			desc: "Link diagrams to API specs, codebases, and process notes."
		},
	];

	const scrollToSection = (id: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({behavior: 'smooth'});
		}
	};

	return (
		<Box bg={"white"}
			 style={{color: 'black', minHeight: '100vh'}}>
			{/* Navigation Bar */}
			<Box py="sm" px="lg" bg="white">
				<Container size="md">
					<Flex justify="space-between" align="center">
						<Group gap="lg" justify="center">
							{['features', 'use-cases', 'pricing'].map((section) => (
								<Button
									key={section}
									variant="subtle"
									color="dark"
									onClick={() => scrollToSection(section)}
									style={{
										fontWeight: 500,
										transition: 'background-color 0.3s ease, transform 0.2s ease'
									}}
								>
									{section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
								</Button>
							))}
						</Group>
						<Group gap="sm">
							<Button variant="outline" size="xs">Log in</Button>
							<Button color="blue" size="xs">Sign up</Button>
						</Group>
					</Flex>
				</Container>
			</Box>
			<Box py={80} bg="blue.1">
				<Container size="md" ta="center">
					<motion.div initial={{opacity: 0, y: -30}} animate={{opacity: 1, y: 0}}
								transition={{duration: 0.6}}>
						<Title order={1} fz="48px" c='blue.7'>
							FlowCraft
						</Title>
						<Text fz="lg" mt="md" c='blue.9'>
							Visualize and model your data flows and system architecture using the{' '}
							<a href="https://c4model.com/" style={{textDecoration: 'underline'}}>C4 Model</a>
						</Text>
						<Group justify="center" mt="xl">
							<Button color="blue" size="md" radius="xl">
								Try it now
							</Button>
							<Button variant="outline" size="md" radius="xl" component="a"
									href="https://github.com/Universemul/flowcraft" target="_blank">
								View on GitHub
							</Button>
						</Group>
					</motion.div>
				</Container>
			</Box>

			<Container id="features" size="lg" py={80}>
				<Center>
					<Stack gap="xs" align="center" mb="xl">
						<Group gap={10} mb="md" justify="center" align="baseline" ta='center'>
							<ThemeIcon variant="light" radius="xl" size="lg" color="blue">
								<Key size={20}/>
							</ThemeIcon>
							<Title order={2} mb="md" c='blue.7'>
								Key Features
							</Title>
						</Group>
						<Text c='gray.7' ta="center">
							From nested zoomable diagrams to user journeys and code linking,
							FlowCraft transforms your system diagrams into interactive experiences.
						</Text>
					</Stack>
				</Center>
				<Group grow>
					{features.map(({icon: Icon, title, desc}, i) => (
						<motion.div key={i} whileHover={{scale: 1.05}}>
							<Card shadow="md" padding="lg" radius="md" withBorder bg='white'>
								<Center>
									<ThemeIcon size="xl" radius="xl" variant="light" color="blue">
										<Icon size={24}/>
									</ThemeIcon>
								</Center>
								<Title order={4} ta="center" mt="md" c='blue.8'>
									{title}
								</Title>
								<Text ta="center" mt="xs" c='gray.7'>
									{desc}
								</Text>
							</Card>
						</motion.div>
					))}
				</Group>
			</Container>

			<Container id="pricing" size="lg" py={80} ta="center">
				<Group gap={10} mb="md" justify="center" align="baseline" ta='center'>
					<ThemeIcon variant="light" radius="xl" size="lg" color="blue">
						<Coins size={20}/>
					</ThemeIcon>
					<Title order={2} mb="md" c='blue.7'>
						Pricing
					</Title>
				</Group>
				<Text c='gray.7' mb="xl">
					Choose the plan that fits your needs. No credit card required to get started.
				</Text>
				<Group grow align="stretch">
					<Card shadow="md" padding="xl" radius="md" withBorder bg='white'>
						<Title order={4}>Free</Title>
						<Text mt="xs">Basic features for individuals</Text>
						<Text mt="sm" fw={700}>$0/month</Text>
						<Button mt="md" fullWidth>Get Started</Button>
					</Card>
					<Card shadow="md" padding="xl" radius="md" withBorder bg='white'>
						<Title order={4}>Pro</Title>
						<Text mt="xs">Advanced features for teams</Text>
						<Text mt="sm" fw={700}>$12/month</Text>
						<Button mt="md" fullWidth>Start Free Trial</Button>
					</Card>
					<Card shadow="md" padding="xl" radius="md" withBorder bg='white'>
						<Title order={4}>Enterprise</Title>
						<Text mt="xs">Custom solutions for businesses</Text>
						<Text mt="sm" fw={700}>Contact us</Text>
						<Button mt="md" fullWidth>Contact Sales</Button>
					</Card>
				</Group>
			</Container>

			<Box bg="blue.0" py={80}>
				<Container size="md" ta="center">
					<Title order={2} mb="sm" c='blue.7'>
						Built for teams and architects
					</Title>
					<Text c='gray.7'>
						Whether you're documenting an existing system or designing a new one,
						FlowCraft helps you structure, narrate, and evolve your architecture visually.
					</Text>
				</Container>
			</Box>

			<Container id="use-cases" size="lg" py={80}>
				<Center>
					<Stack gap="xs" align="center" mb="xl">
						<Group gap={10} mb="md" justify="center" align="baseline" ta='center'>
							<ThemeIcon variant="light" radius="xl" size="lg" color="blue">
								<Lightbulb size={20}/>
							</ThemeIcon>
							<Title order={2} mb="md" c='blue.7'>
								Use Cases
							</Title>
						</Group>
						<Text c='gray.7' ta="center">
							FlowCraft adapts to a wide range of architecture and documentation scenarios.
						</Text>
					</Stack>
				</Center>
				<Group grow>
					{useCases.map(({title, desc}, i) => (
						<motion.div key={i} whileHover={{scale: 1.05}}>
							<Card shadow="md" padding="lg" radius="md" withBorder bg='white'>
								<Title order={4} c='blue.8'>{title}</Title>
								<Text mt="sm" c='gray.7'>{desc}</Text>
							</Card>
						</motion.div>
					))}
				</Group>
			</Container>

			<Container size="lg" py={80} ta="center">
				<Title order={2} mb="sm" c='blue.7'>🎬 Demo Video</Title>
				<Text c='gray.7' mb="lg">
					See FlowCraft in action with a walkthrough of its core features.
				</Text>
				<Box style={{
					position: 'relative',
					paddingBottom: '56.25%',
					height: 0,
					overflow: 'hidden',
					borderRadius: '12px'
				}}>
					<iframe
						style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}
						src="https://www.youtube.com/embed/dQw4w9WgXcQ"
						title="FlowCraft Demo"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</Box>
			</Container>

			<Box bg="blue.0" py={60}>
				<Container size="sm" ta="center">
					<Title order={3} mb="xs" c="blue.9">📬 Stay in the loop</Title>
					<Text mb="md" c="gray.7">
						Sign up for updates, tips, and beta invites.
					</Text>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							alert(`Subscribed with ${email}`);
							setEmail("");
						}}>
						<Group justify="center" mt="md">
							<TextInput
								placeholder="Enter your email"
								value={email}
								onChange={(event) => setEmail(event.currentTarget.value)}
							/>
							<Button type="submit" color="blue">
								Subscribe
							</Button>
						</Group>
					</form>
				</Container>
			</Box>

			<Box bg='white' py="lg" ta="center">
				<Text size="sm" c="gray.6">
					MIT License — <a href="https://github.com" style={{textDecoration: 'underline'}}>Contribute on
					GitHub</a>
				</Text>
				<Text size="xs" c="gray.5" mt={4}>© 2025 FlowCraft. All rights reserved.</Text>
			</Box>
		</Box>
	);
}
