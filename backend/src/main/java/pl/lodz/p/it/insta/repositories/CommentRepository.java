package pl.lodz.p.it.insta.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.lodz.p.it.insta.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
