package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.Topic;

public interface TopicRepository extends JpaRepository<Topic, Long> {
}
